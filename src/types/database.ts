// Auto-generated TypeScript types from Supabase schema
// This file should be regenerated when schema changes using: supabase gen types typescript

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string
          company_name: string
          url: string | null
          industry_niche: string | null
          hq_location: string | null
          founded: number | null
          team_size: number | null
          revenue_range: 'Under $500k' | '$500k-$1M' | '$1M-$2M' | '$2M-$5M' | '$5M-$10M' | '$10M+' | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_name: string
          url?: string | null
          industry_niche?: string | null
          hq_location?: string | null
          founded?: number | null
          team_size?: number | null
          revenue_range?: 'Under $500k' | '$500k-$1M' | '$1M-$2M' | '$2M-$5M' | '$5M-$10M' | '$10M+' | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_name?: string
          url?: string | null
          industry_niche?: string | null
          hq_location?: string | null
          founded?: number | null
          team_size?: number | null
          revenue_range?: 'Under $500k' | '$500k-$1M' | '$1M-$2M' | '$2M-$5M' | '$5M-$10M' | '$10M+' | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      leadership_contacts: {
        Row: {
          id: string
          company_id: string
          full_name: string
          role: 'CEO' | 'Founder' | 'Co-Founder' | 'CRO' | 'COO' | 'CMO' | 'Partner' | 'VP Sales' | 'VP Operations' | 'Other' | null
          email: string | null
          linkedin_url: string | null
          is_decision_maker: boolean | null
          personality_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          full_name: string
          role?: 'CEO' | 'Founder' | 'Co-Founder' | 'CRO' | 'COO' | 'CMO' | 'Partner' | 'VP Sales' | 'VP Operations' | 'Other' | null
          email?: string | null
          linkedin_url?: string | null
          is_decision_maker?: boolean | null
          personality_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          full_name?: string
          role?: 'CEO' | 'Founder' | 'Co-Founder' | 'CRO' | 'COO' | 'CMO' | 'Partner' | 'VP Sales' | 'VP Operations' | 'Other' | null
          email?: string | null
          linkedin_url?: string | null
          is_decision_maker?: boolean | null
          personality_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          company_id: string
          name: string
          role: 'Account Manager' | 'Media Buyer' | 'Designer' | 'Developer' | 'Copywriter' | 'Strategist' | 'Project Manager' | 'Analytics Specialist' | 'SEO Specialist' | 'Social Media Manager' | 'Other' | null
          linkedin_url: string | null
          strengths_notes: string | null
          capacity_contribution_score: number | null
          reports_to_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          name: string
          role?: 'Account Manager' | 'Media Buyer' | 'Designer' | 'Developer' | 'Copywriter' | 'Strategist' | 'Project Manager' | 'Analytics Specialist' | 'SEO Specialist' | 'Social Media Manager' | 'Other' | null
          linkedin_url?: string | null
          strengths_notes?: string | null
          capacity_contribution_score?: number | null
          reports_to_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          name?: string
          role?: 'Account Manager' | 'Media Buyer' | 'Designer' | 'Developer' | 'Copywriter' | 'Strategist' | 'Project Manager' | 'Analytics Specialist' | 'SEO Specialist' | 'Social Media Manager' | 'Other' | null
          linkedin_url?: string | null
          strengths_notes?: string | null
          capacity_contribution_score?: number | null
          reports_to_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          company_id: string
          service_name: string
          description: string | null
          price_range: string | null
          delivery_model: 'Retainer' | 'Project' | 'Hybrid' | 'Performance' | 'Other' | null
          delivery_constraints: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          service_name: string
          description?: string | null
          price_range?: string | null
          delivery_model?: 'Retainer' | 'Project' | 'Hybrid' | 'Performance' | 'Other' | null
          delivery_constraints?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          service_name?: string
          description?: string | null
          price_range?: string | null
          delivery_model?: 'Retainer' | 'Project' | 'Hybrid' | 'Performance' | 'Other' | null
          delivery_constraints?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          company_id: string
          client_name: string
          industry: string | null
          monthly_value: number | null
          profitability_rating: 'Low' | 'Medium' | 'High' | null
          fit_rating: number | null
          duration_months: number | null
          churn_risk: 'Low' | 'Medium' | 'High' | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          client_name: string
          industry?: string | null
          monthly_value?: number | null
          profitability_rating?: 'Low' | 'Medium' | 'High' | null
          fit_rating?: number | null
          duration_months?: number | null
          churn_risk?: 'Low' | 'Medium' | 'High' | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          client_name?: string
          industry?: string | null
          monthly_value?: number | null
          profitability_rating?: 'Low' | 'Medium' | 'High' | null
          fit_rating?: number | null
          duration_months?: number | null
          churn_risk?: 'Low' | 'Medium' | 'High' | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      client_services: {
        Row: {
          id: string
          client_id: string
          service_id: string
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          service_id: string
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          service_id?: string
          created_at?: string
        }
      }
      financials: {
        Row: {
          id: string
          company_id: string
          month: string
          revenue: number | null
          cost_of_delivery: number | null
          gross_margin_percentage: number | null
          operating_costs: number | null
          net_profit_percentage: number | null
          target_revenue_goal: number | null
          target_profit_goal: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          month: string
          revenue?: number | null
          cost_of_delivery?: number | null
          operating_costs?: number | null
          target_revenue_goal?: number | null
          target_profit_goal?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          month?: string
          revenue?: number | null
          cost_of_delivery?: number | null
          operating_costs?: number | null
          target_revenue_goal?: number | null
          target_profit_goal?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      sales_assets: {
        Row: {
          id: string
          company_id: string
          asset_name: string
          asset_type: 'Deck' | 'Proposal' | 'Case Study' | 'One-pager' | 'SOP' | 'Email Template' | 'Script' | 'Other' | null
          file_url: string | null
          last_updated: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          asset_name: string
          asset_type?: 'Deck' | 'Proposal' | 'Case Study' | 'One-pager' | 'SOP' | 'Email Template' | 'Script' | 'Other' | null
          file_url?: string | null
          last_updated?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          asset_name?: string
          asset_type?: 'Deck' | 'Proposal' | 'Case Study' | 'One-pager' | 'SOP' | 'Email Template' | 'Script' | 'Other' | null
          file_url?: string | null
          last_updated?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      lead_gen_sales_process: {
        Row: {
          id: string
          company_id: string
          main_lead_sources: string[] | null
          monthly_lead_volume: number | null
          request_to_meeting_rate: number | null
          meeting_to_proposal_rate: number | null
          proposal_to_close_rate: number | null
          sales_process_description: string | null
          outbound_tools: string[] | null
          sales_positioning_summary: string | null
          visibility_score: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          main_lead_sources?: string[] | null
          monthly_lead_volume?: number | null
          request_to_meeting_rate?: number | null
          meeting_to_proposal_rate?: number | null
          proposal_to_close_rate?: number | null
          sales_process_description?: string | null
          outbound_tools?: string[] | null
          sales_positioning_summary?: string | null
          visibility_score?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          main_lead_sources?: string[] | null
          monthly_lead_volume?: number | null
          request_to_meeting_rate?: number | null
          meeting_to_proposal_rate?: number | null
          proposal_to_close_rate?: number | null
          sales_process_description?: string | null
          outbound_tools?: string[] | null
          sales_positioning_summary?: string | null
          visibility_score?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      ops_capacity: {
        Row: {
          id: string
          company_id: string
          hours_available_per_week: number | null
          hours_sold_per_week: number | null
          utilization_percentage: number | null
          biggest_bottlenecks: string | null
          delivery_model: string | null
          sop_quality_rating: number | null
          team_capacity_risk: 'Low' | 'Medium' | 'High' | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          hours_available_per_week?: number | null
          hours_sold_per_week?: number | null
          biggest_bottlenecks?: string | null
          delivery_model?: string | null
          sop_quality_rating?: number | null
          team_capacity_risk?: 'Low' | 'Medium' | 'High' | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          hours_available_per_week?: number | null
          hours_sold_per_week?: number | null
          biggest_bottlenecks?: string | null
          delivery_model?: string | null
          sop_quality_rating?: number | null
          team_capacity_risk?: 'Low' | 'Medium' | 'High' | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      competitors: {
        Row: {
          id: string
          company_id: string
          competitor_name: string
          url: string | null
          positioning_summary: string | null
          strengths: string | null
          weaknesses: string | null
          differentiation_opportunities: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          competitor_name: string
          url?: string | null
          positioning_summary?: string | null
          strengths?: string | null
          weaknesses?: string | null
          differentiation_opportunities?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          competitor_name?: string
          url?: string | null
          positioning_summary?: string | null
          strengths?: string | null
          weaknesses?: string | null
          differentiation_opportunities?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      company_health_scores: {
        Row: {
          id: string
          company_name: string
          ideal_client_fit_score: number
          sales_health_score: number
          ops_health_score: number
        }
      }
      company_overview: {
        Row: {
          id: string
          company_name: string
          url: string | null
          industry_niche: string | null
          hq_location: string | null
          founded: number | null
          team_size: number | null
          revenue_range: string | null
          ideal_client_fit_score: number
          sales_health_score: number
          ops_health_score: number
          overall_wtf_health_score: number
          total_clients: number
          total_leadership: number
          total_team_members: number
          total_services: number
          notes: string | null
          created_at: string
          updated_at: string
        }
      }
    }
    Functions: {}
    Enums: {}
  }
}
