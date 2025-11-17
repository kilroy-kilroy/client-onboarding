'use client'

import type { OnboardingStep } from '@/types/onboarding'

interface ProgressBarProps {
  steps: OnboardingStep[]
  currentStep: number
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex-1 ${index !== steps.length - 1 ? 'pr-2' : ''}`}
          >
            <div className="relative">
              <div
                className={`h-3 rounded-full transition-colors ${
                  index === currentStep
                    ? 'bg-brand-yellow'
                    : index < currentStep
                    ? 'bg-brand-red'
                    : 'bg-gray-700'
                }`}
              />
              <div
                className={`absolute -top-8 left-0 right-0 text-xs text-center font-medium font-poppins ${
                  index === currentStep
                    ? 'text-brand-yellow font-bold'
                    : index < currentStep
                    ? 'text-brand-red'
                    : 'text-gray-500'
                }`}
              >
                {step.title}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-gray-300 mt-8 font-poppins">
        Step {currentStep + 1} of {steps.length}
      </div>
    </div>
  )
}
