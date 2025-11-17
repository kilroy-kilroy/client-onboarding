import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

export async function POST(request: NextRequest) {
  try {
    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      )
    }

    const { companyId } = await request.json()

    // Fetch company overview
    const { data: company } = await supabaseAdmin
      .from('company_overview')
      .select('*')
      .eq('id', companyId)
      .single()

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    // Fetch all related data for comprehensive plan
    const [clients, financials, sales, ops] = await Promise.all([
      supabaseAdmin.from('clients').select('*').eq('company_id', companyId),
      supabaseAdmin.from('financials').select('*').eq('company_id', companyId).order('month', { ascending: false }).limit(1),
      supabaseAdmin.from('lead_gen_sales_process').select('*').eq('company_id', companyId).single(),
      supabaseAdmin.from('ops_capacity').select('*').eq('company_id', companyId).single(),
    ])

    const prompt = `You are Tim Kilroy's AI agency consultant. Create a detailed 90-day Go Forward Plan for ${company.company_name}.

**Company Data:**
- Revenue Range: ${company.revenue_range || 'Unknown'}
- Team Size: ${company.team_size || 'Unknown'}
- Total Clients: ${company.total_clients}
- Health Scores:
  - Overall: ${company.overall_wtf_health_score?.toFixed(1) || 'N/A'}/10
  - Client Fit: ${company.ideal_client_fit_score?.toFixed(1) || 'N/A'}/10
  - Sales: ${company.sales_health_score?.toFixed(1) || 'N/A'}/10
  - Ops: ${company.ops_health_score?.toFixed(1) || 'N/A'}/10

**Financials:**
${financials.data?.[0] ? `
- Monthly Revenue: $${financials.data[0].revenue?.toLocaleString() || '0'}
- Gross Margin: ${financials.data[0].gross_margin_percentage || 'N/A'}%
- Net Profit: ${financials.data[0].net_profit_percentage || 'N/A'}%
` : '- No financial data available'}

**Sales:**
${sales.data ? `
- Visibility Score: ${sales.data.visibility_score || 'N/A'}/10
- Monthly Leads: ${sales.data.monthly_lead_volume || 'N/A'}
- Conversion Rates: ${sales.data.request_to_meeting_rate || 'N/A'}% → ${sales.data.meeting_to_proposal_rate || 'N/A'}% → ${sales.data.proposal_to_close_rate || 'N/A'}%
` : '- No sales data available'}

**Operations:**
${ops.data ? `
- Utilization: ${ops.data.utilization_percentage || 'N/A'}%
- SOP Quality: ${ops.data.sop_quality_rating || 'N/A'}/10
- Capacity Risk: ${ops.data.team_capacity_risk || 'N/A'}
` : '- No ops data available'}

Create a 90-day plan with these sections:

# 90-Day Go Forward Plan: ${company.company_name}

## Executive Summary
[2-3 sentences on the current state and transformation goal]

## Month 1 (Days 1-30): Foundation & Quick Wins
**Theme:** [One-line theme]

**Objectives:**
1. [Objective 1]
2. [Objective 2]
3. [Objective 3]

**Key Actions:**
- Week 1: [Specific actions]
- Week 2: [Specific actions]
- Week 3: [Specific actions]
- Week 4: [Specific actions]

**Success Metrics:**
- [Metric 1]
- [Metric 2]
- [Metric 3]

## Month 2 (Days 31-60): Scale & Systematize
**Theme:** [One-line theme]

**Objectives:**
1. [Objective 1]
2. [Objective 2]
3. [Objective 3]

**Key Actions:**
- Week 5-6: [Specific actions]
- Week 7-8: [Specific actions]

**Success Metrics:**
- [Metric 1]
- [Metric 2]
- [Metric 3]

## Month 3 (Days 61-90): Accelerate & Optimize
**Theme:** [One-line theme]

**Objectives:**
1. [Objective 1]
2. [Objective 2]
3. [Objective 3]

**Key Actions:**
- Week 9-10: [Specific actions]
- Week 11-12: [Specific actions]

**Success Metrics:**
- [Metric 1]
- [Metric 2]
- [Metric 3]

## Programs to Deploy
Based on the data, recommend which WTF Agency programs to implement:
- **Roadmap**: [Yes/No + why]
- **GEN+ (Social Authority)**: [Yes/No + why]
- **FYFS (CallLab)**: [Yes/No + why]
- **DemandOS**: [Yes/No + why]
- **GTM OS**: [Yes/No + why]

## Expected Outcomes (End of 90 Days)
- Revenue: [Projection]
- Clients: [Projection]
- Team: [Projection]
- Key Metrics: [Specific improvements]

## Critical Success Factors
1. [Factor 1]
2. [Factor 2]
3. [Factor 3]

Be specific, actionable, and data-driven. Prioritize based on their current health scores and constraints.`

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
        messages: [{ role: 'user', content: prompt }]
      })
    })

    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text()
      return NextResponse.json(
        { error: 'AI generation failed', details: errorText },
        { status: 500 }
      )
    }

    const claudeData = await claudeResponse.json()
    const plan = claudeData.content[0].text

    return NextResponse.json({
      success: true,
      plan,
      company_id: companyId,
    })

  } catch (error) {
    console.error('Go Forward Plan error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: String(error) },
      { status: 500 }
    )
  }
}
