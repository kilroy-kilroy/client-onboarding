import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/server'
import type { OnboardingFormData } from '@/types/onboarding'

export async function POST(request: NextRequest) {
  try {
    const data: OnboardingFormData & { company: { email?: string; password?: string } } = await request.json()

    // 1. Create User Account
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: data.company.email!,
      password: data.company.password!,
      email_confirm: true, // Auto-confirm email
    })

    if (authError || !authData.user) {
      console.error('User creation error:', authError)
      return NextResponse.json(
        { error: 'Failed to create user account', message: authError?.message },
        { status: 500 }
      )
    }

    const userId = authData.user.id

    // 2. Insert Company
    const { data: company, error: companyError } = await supabaseAdmin
      .from('companies')
      .insert({
        user_id: userId,
        company_name: data.company.company_name,
        url: data.company.url,
        industry_niche: data.company.industry_niche,
        hq_location: data.company.hq_location,
        founded: data.company.founded,
        team_size: data.company.team_size,
        revenue_range: data.company.revenue_range,
      })
      .select()
      .single()

    if (companyError || !company) {
      console.error('Company insert error:', companyError)
      return NextResponse.json(
        { error: 'Failed to create company', message: companyError?.message },
        { status: 500 }
      )
    }

    const companyId = company.id

    // 3. Insert Leadership Contacts
    if (data.leadership?.contacts && data.leadership.contacts.length > 0) {
      const leadershipData = data.leadership.contacts.map(contact => ({
        company_id: companyId,
        full_name: contact.full_name,
        role: contact.role,
        email: contact.email,
        linkedin_url: contact.linkedin_url,
        is_decision_maker: contact.is_decision_maker,
        personality_notes: contact.personality_notes,
      }))

      const { error: leadershipError } = await supabaseAdmin
        .from('leadership_contacts')
        .insert(leadershipData)

      if (leadershipError) {
        console.error('Leadership insert error:', leadershipError)
        // Continue despite error - we don't want to fail the whole onboarding
      }
    }

    // 4. Insert Team Members
    if (data.team?.members && data.team.members.length > 0) {
      const teamData = data.team.members.map(member => ({
        company_id: companyId,
        name: member.name,
        role: member.role,
        linkedin_url: member.linkedin_url,
        strengths_notes: member.strengths_notes,
        capacity_contribution_score: member.capacity_contribution_score,
      }))

      const { error: teamError } = await supabaseAdmin
        .from('team_members')
        .insert(teamData)

      if (teamError) {
        console.error('Team insert error:', teamError)
      }
    }

    // 5. Insert Services
    if (data.services?.services && data.services.services.length > 0) {
      const servicesData = data.services.services.map(service => ({
        company_id: companyId,
        service_name: service.service_name,
        description: service.description,
        price_range: service.price_range,
        delivery_model: service.delivery_model,
        delivery_constraints: service.delivery_constraints,
      }))

      const { error: servicesError } = await supabaseAdmin
        .from('services')
        .insert(servicesData)

      if (servicesError) {
        console.error('Services insert error:', servicesError)
      }
    }

    // 6. Insert Clients
    if (data.clients?.clients && data.clients.clients.length > 0) {
      const clientsData = data.clients.clients.map(client => ({
        company_id: companyId,
        client_name: client.client_name,
        industry: client.industry,
        monthly_value: client.monthly_value,
        profitability_rating: client.profitability_rating,
        fit_rating: client.fit_rating,
        duration_months: client.duration_months,
        churn_risk: client.churn_risk,
        notes: client.notes,
      }))

      const { error: clientsError } = await supabaseAdmin
        .from('clients')
        .insert(clientsData)

      if (clientsError) {
        console.error('Clients insert error:', clientsError)
      }
    }

    // 7. Insert Financial Data (current month)
    if (data.financials && Object.keys(data.financials).length > 0) {
      const currentMonth = new Date().toISOString().slice(0, 7) + '-01' // First day of current month

      const { error: financialsError } = await supabaseAdmin
        .from('financials')
        .insert({
          company_id: companyId,
          month: currentMonth,
          revenue: data.financials.revenue,
          cost_of_delivery: data.financials.cost_of_delivery,
          operating_costs: data.financials.operating_costs,
          target_revenue_goal: data.financials.target_revenue_goal,
          target_profit_goal: data.financials.target_profit_goal,
        })

      if (financialsError) {
        console.error('Financials insert error:', financialsError)
      }
    }

    // 8. Insert Sales Process
    if (data.sales && Object.keys(data.sales).length > 0) {
      const { error: salesError } = await supabaseAdmin
        .from('lead_gen_sales_process')
        .insert({
          company_id: companyId,
          main_lead_sources: data.sales.main_lead_sources,
          monthly_lead_volume: data.sales.monthly_lead_volume,
          request_to_meeting_rate: data.sales.request_to_meeting_rate,
          meeting_to_proposal_rate: data.sales.meeting_to_proposal_rate,
          proposal_to_close_rate: data.sales.proposal_to_close_rate,
          sales_process_description: data.sales.sales_process_description,
          outbound_tools: data.sales.outbound_tools,
          sales_positioning_summary: data.sales.sales_positioning_summary,
          visibility_score: data.sales.visibility_score,
        })

      if (salesError) {
        console.error('Sales process insert error:', salesError)
      }
    }

    // 9. Insert Ops & Capacity
    if (data.ops && Object.keys(data.ops).length > 0) {
      const { error: opsError } = await supabaseAdmin
        .from('ops_capacity')
        .insert({
          company_id: companyId,
          hours_available_per_week: data.ops.hours_available_per_week,
          hours_sold_per_week: data.ops.hours_sold_per_week,
          biggest_bottlenecks: data.ops.biggest_bottlenecks,
          delivery_model: data.ops.delivery_model,
          sop_quality_rating: data.ops.sop_quality_rating,
          team_capacity_risk: data.ops.team_capacity_risk,
        })

      if (opsError) {
        console.error('Ops capacity insert error:', opsError)
      }
    }

    // 10. Insert Competitors
    if (data.competitors?.competitors && data.competitors.competitors.length > 0) {
      const competitorsData = data.competitors.competitors.map(competitor => ({
        company_id: companyId,
        competitor_name: competitor.competitor_name,
        url: competitor.url,
        positioning_summary: competitor.positioning_summary,
        strengths: competitor.strengths,
        weaknesses: competitor.weaknesses,
        differentiation_opportunities: competitor.differentiation_opportunities,
      }))

      const { error: competitorsError } = await supabaseAdmin
        .from('competitors')
        .insert(competitorsData)

      if (competitorsError) {
        console.error('Competitors insert error:', competitorsError)
      }
    }

    return NextResponse.json({
      success: true,
      company_id: companyId,
      message: 'Onboarding data saved successfully',
    })
  } catch (error) {
    console.error('Onboarding submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: String(error) },
      { status: 500 }
    )
  }
}
