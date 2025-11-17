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

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<OnboardingFormData>>({})

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
