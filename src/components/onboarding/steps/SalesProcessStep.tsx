'use client'

import { useState } from 'react'
import type { SalesProcessData } from '@/types/onboarding'
import FormNavigation from '../FormNavigation'

interface SalesProcessStepProps {
  initialData?: SalesProcessData
  onNext: (data: SalesProcessData) => void
  onBack: () => void
}

export default function SalesProcessStep({ initialData, onNext, onBack }: SalesProcessStepProps) {
  const [formData, setFormData] = useState<SalesProcessData>(initialData || {})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  const handleNumberChange = (field: keyof SalesProcessData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value ? parseFloat(value) : undefined
    }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Sales & Lead Generation</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Tell us about your sales funnel and lead generation process.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Monthly Lead Volume
          </label>
          <input
            type="number"
            value={formData.monthly_lead_volume || ''}
            onChange={(e) => handleNumberChange('monthly_lead_volume', e.target.value)}
            placeholder="50"
            min="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Request → Meeting (%)
            </label>
            <input
              type="number"
              value={formData.request_to_meeting_rate || ''}
              onChange={(e) => handleNumberChange('request_to_meeting_rate', e.target.value)}
              placeholder="50"
              min="0"
              max="100"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Meeting → Proposal (%)
            </label>
            <input
              type="number"
              value={formData.meeting_to_proposal_rate || ''}
              onChange={(e) => handleNumberChange('meeting_to_proposal_rate', e.target.value)}
              placeholder="70"
              min="0"
              max="100"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Proposal → Close (%)
            </label>
            <input
              type="number"
              value={formData.proposal_to_close_rate || ''}
              onChange={(e) => handleNumberChange('proposal_to_close_rate', e.target.value)}
              placeholder="40"
              min="0"
              max="100"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Visibility Score (1-10)
          </label>
          <p className="text-xs text-gray-500 mb-2">How visible/known are you in your market?</p>
          <input
            type="number"
            value={formData.visibility_score || ''}
            onChange={(e) => handleNumberChange('visibility_score', e.target.value)}
            placeholder="5"
            min="1"
            max="10"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sales Process Description
          </label>
          <textarea
            value={formData.sales_process_description || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, sales_process_description: e.target.value }))}
            placeholder="Describe your typical sales process from first contact to closed deal..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sales Positioning Summary
          </label>
          <textarea
            value={formData.sales_positioning_summary || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, sales_positioning_summary: e.target.value }))}
            placeholder="How do you position yourself? What's your unique value prop?"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      <FormNavigation onBack={onBack} />
    </form>
  )
}
