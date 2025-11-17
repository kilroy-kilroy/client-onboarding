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
                className={`h-2 rounded-full transition-colors ${
                  index <= currentStep
                    ? 'bg-primary-600'
                    : 'bg-gray-200 dark:bg-gray-700'
                }`}
              />
              <div
                className={`absolute -top-8 left-0 right-0 text-xs text-center font-medium ${
                  index === currentStep
                    ? 'text-primary-600'
                    : index < currentStep
                    ? 'text-gray-600 dark:text-gray-400'
                    : 'text-gray-400 dark:text-gray-600'
                }`}
              >
                {step.title}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-8">
        Step {currentStep + 1} of {steps.length}
      </div>
    </div>
  )
}
