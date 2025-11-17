'use client'

import type { OnboardingFormData } from '@/types/onboarding'
import FormNavigation from '../FormNavigation'

interface ReviewStepProps {
  data: OnboardingFormData
  onSubmit: (data: OnboardingFormData) => void
  onBack: () => void
}

export default function ReviewStep({ data, onSubmit, onBack }: ReviewStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Review & Submit</h2>

      <div className="space-y-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Company Information</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.company?.company_name || 'Not provided'}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Leadership Contacts</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.leadership?.contacts?.length || 0} contacts added
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Team Members</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {data.team?.members?.length || 0} team members added
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            Ready to submit? This will create your Agency Intelligence profile and take you to your dashboard.
          </p>
        </div>
      </div>

      <FormNavigation onBack={onBack} nextLabel="Submit & Create Profile" />
    </form>
  )
}
