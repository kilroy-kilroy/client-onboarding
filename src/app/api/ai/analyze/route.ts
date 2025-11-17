import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

interface CompanyAnalysisRequest {
  companyId: string
}

export async function POST(request: NextRequest) {
  try {
    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      )
    }

    const { companyId }: CompanyAnalysisRequest = await request.json()

    // Fetch all company data
    const { data: company, error: companyError } = await supabaseAdmin
      .from('companies')
      .select('*')
      .eq('id', companyId)
      .single()

    if (companyError || !company) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    // Fetch related data
    const [leadership, team, services, clients, financials, sales, ops, competitors] = await Promise.all([
      supabaseAdmin.from('leadership_contacts').select('*').eq('company_id', companyId),
      supabaseAdmin.from('team_members').select('*').eq('company_id', companyId),
      supabaseAdmin.from('services').select('*').eq('company_id', companyId),
      supabaseAdmin.from('clients').select('*').eq('company_id', companyId),
      supabaseAdmin.from('financials').select('*').eq('company_id', companyId).order('month', { ascending: false }).limit(1),
      supabaseAdmin.from('lead_gen_sales_process').select('*').eq('company_id', companyId).single(),
      supabaseAdmin.from('ops_capacity').select('*').eq('company_id', companyId).single(),
      supabaseAdmin.from('competitors').select('*').eq('company_id', companyId),
    ])

    // Build context for Claude
    const context = buildAnalysisContext(
      company,
      leadership.data || [],
      team.data || [],
      services.data || [],
      clients.data || [],
      financials.data?.[0],
      sales.data,
      ops.data,
      competitors.data || []
    )

    // Call Claude API
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [
          {
            role: 'user',
            content: `You are an expert agency consultant analyzing this agency's business. Based on the data below, provide a comprehensive Agency Intelligence Snapshot.

${context}

Please provide:

1. **Executive Summary** (2-3 sentences): The most critical insights about this agency

2. **Key Strengths** (3-5 bullet points): What they're doing well

3. **Critical Challenges** (3-5 bullet points): Major issues that need addressing

4. **Opportunities** (3-5 bullet points): Areas for growth and improvement

5. **Recommended Immediate Actions** (Top 3 priorities):
   - Action 1: [Specific, actionable step]
   - Action 2: [Specific, actionable step]
   - Action 3: [Specific, actionable step]

6. **Strategic Insights**:
   - Positioning: How should they position themselves in the market?
   - ICP Refinement: What's their ideal client profile based on current data?
   - Pricing Strategy: Any pricing insights based on financials?
   - Team Structure: Observations about team capacity and structure

Be direct, specific, and actionable. Use the data to support your insights.`
          }
        ]
      })
    })

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text()
      console.error('Claude API error:', errorText)
      return NextResponse.json(
        { error: 'AI analysis failed', details: errorText },
        { status: 500 }
      )
    }

    const claudeData = await claudeResponse.json()
    const analysis = claudeData.content[0].text

    // Store the analysis in the database
    const { error: insertError } = await supabaseAdmin
      .from('companies')
      .update({
        notes: `AI Analysis (${new Date().toISOString().split('T')[0]}):\n\n${analysis}${company.notes ? '\n\n---\n\n' + company.notes : ''}`
      })
      .eq('id', companyId)

    if (insertError) {
      console.error('Failed to store analysis:', insertError)
    }

    return NextResponse.json({
      success: true,
      analysis,
      company_id: companyId,
    })

  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: String(error) },
      { status: 500 }
    )
  }
}

function buildAnalysisContext(
  company: any,
  leadership: any[],
  team: any[],
  services: any[],
  clients: any[],
  financials: any,
  sales: any,
  ops: any,
  competitors: any[]
): string {
  let context = `# ${company.company_name}\n\n`

  // Company basics
  context += `## Company Overview\n`
  context += `- Industry: ${company.industry_niche || 'Not specified'}\n`
  context += `- Location: ${company.hq_location || 'Not specified'}\n`
  context += `- Founded: ${company.founded || 'Not specified'}\n`
  context += `- Team Size: ${company.team_size || 'Not specified'}\n`
  context += `- Revenue Range: ${company.revenue_range || 'Not specified'}\n\n`

  // Leadership
  if (leadership.length > 0) {
    context += `## Leadership Team\n`
    leadership.forEach(l => {
      context += `- ${l.full_name} (${l.role})${l.is_decision_maker ? ' - Decision Maker' : ''}\n`
    })
    context += `\n`
  }

  // Team
  if (team.length > 0) {
    context += `## Team Members (${team.length} total)\n`
    const roleBreakdown = team.reduce((acc: any, t) => {
      acc[t.role] = (acc[t.role] || 0) + 1
      return acc
    }, {})
    Object.entries(roleBreakdown).forEach(([role, count]) => {
      context += `- ${role}: ${count}\n`
    })
    context += `\n`
  }

  // Services
  if (services.length > 0) {
    context += `## Services Offered\n`
    services.forEach(s => {
      context += `- ${s.service_name} (${s.delivery_model}): ${s.price_range || 'Price not specified'}\n`
      if (s.description) context += `  ${s.description}\n`
    })
    context += `\n`
  }

  // Clients
  if (clients.length > 0) {
    context += `## Client Portfolio (${clients.length} total)\n`
    const avgFit = (clients.reduce((sum, c) => sum + (c.fit_rating || 0), 0) / clients.length).toFixed(1)
    const totalMRR = clients.reduce((sum, c) => sum + (c.monthly_value || 0), 0)
    const avgDuration = (clients.reduce((sum, c) => sum + (c.duration_months || 0), 0) / clients.length).toFixed(1)

    context += `- Average Fit Rating: ${avgFit}/10\n`
    context += `- Total MRR: $${totalMRR.toLocaleString()}\n`
    context += `- Average Client Duration: ${avgDuration} months\n`
    context += `- High Churn Risk: ${clients.filter(c => c.churn_risk === 'High').length}\n\n`

    context += `Top Clients:\n`
    clients
      .sort((a, b) => (b.monthly_value || 0) - (a.monthly_value || 0))
      .slice(0, 5)
      .forEach(c => {
        context += `- ${c.client_name}: $${c.monthly_value?.toLocaleString() || '0'}/mo (Fit: ${c.fit_rating}/10, Churn Risk: ${c.churn_risk})\n`
      })
    context += `\n`
  }

  // Financials
  if (financials) {
    context += `## Financials (Current Month)\n`
    context += `- Revenue: $${financials.revenue?.toLocaleString() || '0'}\n`
    context += `- Cost of Delivery: $${financials.cost_of_delivery?.toLocaleString() || '0'}\n`
    context += `- Operating Costs: $${financials.operating_costs?.toLocaleString() || '0'}\n`
    if (financials.gross_margin_percentage) {
      context += `- Gross Margin: ${financials.gross_margin_percentage}%\n`
    }
    if (financials.net_profit_percentage) {
      context += `- Net Profit Margin: ${financials.net_profit_percentage}%\n`
    }
    if (financials.target_revenue_goal) {
      context += `- Revenue Goal: $${financials.target_revenue_goal.toLocaleString()}\n`
    }
    context += `\n`
  }

  // Sales
  if (sales) {
    context += `## Sales & Lead Generation\n`
    context += `- Monthly Leads: ${sales.monthly_lead_volume || 'Not specified'}\n`
    context += `- Request→Meeting: ${sales.request_to_meeting_rate || 'N/A'}%\n`
    context += `- Meeting→Proposal: ${sales.meeting_to_proposal_rate || 'N/A'}%\n`
    context += `- Proposal→Close: ${sales.proposal_to_close_rate || 'N/A'}%\n`
    context += `- Visibility Score: ${sales.visibility_score || 'N/A'}/10\n`
    if (sales.sales_positioning_summary) {
      context += `- Positioning: ${sales.sales_positioning_summary}\n`
    }
    context += `\n`
  }

  // Ops
  if (ops) {
    context += `## Operations & Capacity\n`
    context += `- Hours Available/Week: ${ops.hours_available_per_week || 'Not specified'}\n`
    context += `- Hours Sold/Week: ${ops.hours_sold_per_week || 'Not specified'}\n`
    if (ops.utilization_percentage) {
      context += `- Utilization: ${ops.utilization_percentage}%\n`
    }
    context += `- SOP Quality: ${ops.sop_quality_rating || 'N/A'}/10\n`
    context += `- Capacity Risk: ${ops.team_capacity_risk || 'Not specified'}\n`
    if (ops.biggest_bottlenecks) {
      context += `- Bottlenecks: ${ops.biggest_bottlenecks}\n`
    }
    context += `\n`
  }

  // Competitors
  if (competitors.length > 0) {
    context += `## Competitive Landscape\n`
    competitors.forEach(c => {
      context += `- ${c.competitor_name}\n`
      if (c.positioning_summary) context += `  Positioning: ${c.positioning_summary}\n`
      if (c.strengths) context += `  Strengths: ${c.strengths}\n`
      if (c.weaknesses) context += `  Weaknesses: ${c.weaknesses}\n`
    })
    context += `\n`
  }

  return context
}
