// Types for the onboarding flow

export interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
}

export interface CompanyBasicsData {
  company_name: string
  url?: string
  industry_niche?: string
  hq_location?: string
  founded?: number
  team_size?: number
  revenue_range?: string
}

export interface LeadershipData {
  contacts: Array<{
    full_name: string
    role: string
    email?: string
    linkedin_url?: string
    is_decision_maker?: boolean
    personality_notes?: string
  }>
}

export interface TeamData {
  members: Array<{
    name: string
    role: string
    linkedin_url?: string
    strengths_notes?: string
    capacity_contribution_score?: number
  }>
}

export interface ServicesData {
  services: Array<{
    service_name: string
    description?: string
    price_range?: string
    delivery_model?: string
    delivery_constraints?: string
  }>
}

export interface ClientsData {
  clients: Array<{
    client_name: string
    industry?: string
    monthly_value?: number
    profitability_rating?: string
    fit_rating?: number
    duration_months?: number
    churn_risk?: string
    notes?: string
    service_ids?: string[]
  }>
}

export interface FinancialsData {
  revenue?: number
  cost_of_delivery?: number
  operating_costs?: number
  target_revenue_goal?: number
  target_profit_goal?: number
}

export interface SalesProcessData {
  main_lead_sources?: string[]
  monthly_lead_volume?: number
  request_to_meeting_rate?: number
  meeting_to_proposal_rate?: number
  proposal_to_close_rate?: number
  sales_process_description?: string
  outbound_tools?: string[]
  sales_positioning_summary?: string
  visibility_score?: number
}

export interface OpsCapacityData {
  hours_available_per_week?: number
  hours_sold_per_week?: number
  biggest_bottlenecks?: string
  delivery_model?: string
  sop_quality_rating?: number
  team_capacity_risk?: string
}

export interface CompetitorsData {
  competitors: Array<{
    competitor_name: string
    url?: string
    positioning_summary?: string
    strengths?: string
    weaknesses?: string
    differentiation_opportunities?: string
  }>
}

export interface OnboardingFormData {
  company: CompanyBasicsData
  leadership: LeadershipData
  team: TeamData
  services: ServicesData
  clients: ClientsData
  financials: FinancialsData
  sales: SalesProcessData
  ops: OpsCapacityData
  competitors: CompetitorsData
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'company',
    title: 'Company Basics',
    description: 'Core information about your agency',
    completed: false,
  },
  {
    id: 'leadership',
    title: 'Leadership Team',
    description: 'Decision makers and key stakeholders',
    completed: false,
  },
  {
    id: 'team',
    title: 'Team Members',
    description: 'Your delivery team and their roles',
    completed: false,
  },
  {
    id: 'services',
    title: 'Services & Offers',
    description: 'What you sell and how you deliver',
    completed: false,
  },
  {
    id: 'clients',
    title: 'Client Portfolio',
    description: 'Your current client base',
    completed: false,
  },
  {
    id: 'financials',
    title: 'Financials',
    description: 'Revenue, costs, and targets',
    completed: false,
  },
  {
    id: 'sales',
    title: 'Sales & Lead Gen',
    description: 'How you generate and close business',
    completed: false,
  },
  {
    id: 'ops',
    title: 'Operations & Capacity',
    description: 'Delivery capacity and constraints',
    completed: false,
  },
  {
    id: 'competitors',
    title: 'Competitive Landscape',
    description: 'Who you compete against',
    completed: false,
  },
  {
    id: 'review',
    title: 'Review & Submit',
    description: 'Confirm and submit your information',
    completed: false,
  },
]
