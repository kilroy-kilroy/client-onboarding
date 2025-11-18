'use client'

import { useState } from 'react'
import { ONBOARDING_STEPS, type OnboardingFormData } from '@/types/onboarding'
import ProgressBar from './ProgressBar'
import CompanyBasicsStep from './steps/CompanyBasicsStep'
import LeadershipStep from './steps/LeadershipStep'
import TeamStep from './steps/TeamStep'
import ServicesStep from './steps/ServicesStep'
import ClientsStep from './steps/ClientsStep'
import FinancialsStep from './steps/FinancialsStep'
import SalesProcessStep from './steps/SalesProcessStep'
import OpsCapacityStep from './steps/OpsCapacityStep'
import CompetitorsStep from './steps/CompetitorsStep'
import ReviewStep from './steps/ReviewStep'

// Demo data for quick testing
const DEMO_DATA: Partial<OnboardingFormData> = {
  company: {
    email: 'demo@agency.com',
    password: 'password123',
    company_name: 'Velocity Marketing Agency',
    url: 'https://velocitymarketing.com',
    industry_niche: 'B2B SaaS Marketing',
    hq_location: 'Austin, TX',
    founded: 2018,
    team_size: 12,
    revenue_range: '$1M-$2M',
  } as any,
  leadership: {
    contacts: [
      {
        full_name: 'Sarah Johnson',
        role: 'CEO',
        email: 'sarah@velocitymarketing.com',
        linkedin_url: 'https://linkedin.com/in/sarahjohnson',
        is_decision_maker: true,
        personality_notes: 'Strategic thinker, data-driven, focused on scaling'
      }
    ]
  },
  team: {
    members: [
      {
        name: 'Mike Chen',
        role: 'Creative Director',
        linkedin_url: 'https://linkedin.com/in/mikechen',
        strengths_notes: 'Exceptional design skills, brand strategy',
        capacity_contribution_score: 8
      }
    ]
  },
  services: {
    services: [
      {
        service_name: 'Content Marketing',
        description: 'Strategic content creation and distribution for B2B SaaS',
        price_range: '$5,000-$15,000/month',
        delivery_model: 'Retainer',
        delivery_constraints: 'Requires 2-week onboarding period'
      }
    ]
  },
  clients: {
    clients: [
      {
        client_name: 'TechFlow Inc',
        industry: 'SaaS',
        monthly_value: 12000,
        profitability_rating: 8,
        fit_rating: 9,
        duration_months: 18,
        churn_risk: 'Low',
        notes: 'Great long-term partner, expanding scope'
      }
    ]
  },
  financials: {
    revenue: 1500000,
    cost_of_delivery: 750000,
    operating_costs: 400000,
    target_revenue_goal: 2000000,
    target_profit_goal: 500000
  },
  sales: {
    main_lead_sources: 'Referrals, LinkedIn, Content Marketing',
    monthly_lead_volume: 25,
    request_to_meeting_rate: 60,
    meeting_to_proposal_rate: 50,
    proposal_to_close_rate: 40,
    sales_process_description: 'Consultative selling with 3-step process',
    outbound_tools: 'LinkedIn Sales Navigator, HubSpot',
    sales_positioning_summary: 'Premium B2B SaaS marketing partner',
    visibility_score: 7
  },
  ops: {
    hours_available_per_week: 400,
    hours_sold_per_week: 320,
    biggest_bottlenecks: 'Content production capacity, client onboarding time',
    delivery_model: 'Hybrid - mix of retainer and project work',
    sop_quality_rating: 7,
    team_capacity_risk: 'Medium - need to hire 2 more team members'
  },
  competitors: {
    competitors: [
      {
        competitor_name: 'GrowthLab Agency',
        url: 'https://growthlabagency.com',
        positioning_summary: 'Full-service growth marketing for tech companies',
        strengths: 'Large team, established brand, comprehensive services',
        weaknesses: 'Less specialized, higher prices, slower turnaround',
        differentiation_opportunities: 'Our B2B SaaS specialization and faster execution'
      }
    ]
  }
}

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<OnboardingFormData>>(DEMO_DATA)

  const handleNext = (stepData: any) => {
    const stepId = ONBOARDING_STEPS[currentStep].id
    setFormData((prev) => ({
      ...prev,
      [stepId]: stepData,
    }))

    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (finalData: OnboardingFormData) => {
    try {
      const response = await fetch('/api/onboarding/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      })

      if (response.ok) {
        const result = await response.json()
        window.location.href = `/dashboard/${result.company_id}`
      } else {
        const error = await response.json()
        alert(`Error: ${error.message}`)
      }
    } catch (error) {
      console.error('Submission error:', error)
      alert('Failed to submit onboarding data. Please try again.')
    }
  }

  const renderStep = () => {
    const stepId = ONBOARDING_STEPS[currentStep].id
    const stepData = formData[stepId as keyof OnboardingFormData]

    switch (stepId) {
      case 'company':
        return <CompanyBasicsStep initialData={stepData} onNext={handleNext} onBack={handleBack} />
      case 'leadership':
        return <LeadershipStep initialData={stepData} onNext={handleNext} onBack={handleBack} />
      case 'team':
        return <TeamStep initialData={stepData} onNext={handleNext} onBack={handleBack} />
      case 'services':
        return <ServicesStep initialData={stepData} onNext={handleNext} onBack={handleBack} />
      case 'clients':
        return <ClientsStep initialData={stepData} onNext={handleNext} onBack={handleBack} />
      case 'financials':
        return <FinancialsStep initialData={stepData} onNext={handleNext} onBack={handleBack} />
      case 'sales':
        return <SalesProcessStep initialData={stepData} onNext={handleNext} onBack={handleBack} />
      case 'ops':
        return <OpsCapacityStep initialData={stepData} onNext={handleNext} onBack={handleBack} />
      case 'competitors':
        return <CompetitorsStep initialData={stepData} onNext={handleNext} onBack={handleBack} />
      case 'review':
        return <ReviewStep data={formData as OnboardingFormData} onSubmit={handleSubmit} onBack={handleBack} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl md:text-6xl font-anton uppercase mb-4 text-brand-red">
            WTF Intelligence Intake
          </h1>
          <p className="text-xl text-brand-yellow font-bold mb-2">
            Fix Your Fundamentals First
          </p>
          <p className="text-gray-300">
            {ONBOARDING_STEPS[currentStep].description}
          </p>
        </div>

        <ProgressBar
          steps={ONBOARDING_STEPS}
          currentStep={currentStep}
        />

        <div className="mt-8 bg-white text-black rounded-lg p-8 border-4 border-brand-red">
          {renderStep()}
        </div>
      </div>
    </div>
  )
}
