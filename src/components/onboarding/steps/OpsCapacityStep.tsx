'use client'

import { useState } from 'react'
import type { OpsCapacityData } from '@/types/onboarding'
import FormNavigation from '../FormNavigation'

interface OpsCapacityStepProps {
  initialData?: OpsCapacityData
  onNext: (data: OpsCapacityData) => void
  onBack: () => void
}

export default function OpsCapacityStep({ initialData, onNext, onBack }: OpsCapacityStepProps) {
  const [formData, setFormData] = useState<OpsCapacityData>(initialData || {})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  const handleNumberChange = (field: keyof OpsCapacityData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value ? parseFloat(value) : undefined
    }))
  }

  const utilization = formData.hours_available_per_week && formData.hours_sold_per_week
    ? ((formData.hours_sold_per_week / formData.hours_available_per_week) * 100).toFixed(1)
    : null

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Operations & Capacity</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Help us understand your delivery capacity and operational constraints.
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Hours Available Per Week
            </label>
            <input
              type="number"
              value={formData.hours_available_per_week || ''}
              onChange={(e) => handleNumberChange('hours_available_per_week', e.target.value)}
              placeholder="160"
              min="0"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Hours Sold Per Week
            </label>
            <input
              type="number"
              value={formData.hours_sold_per_week || ''}
              onChange={(e) => handleNumberChange('hours_sold_per_week', e.target.value)}
              placeholder="120"
              min="0"
              step="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        {utilization && (
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 p-4 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Team Utilization</div>
            <div className="text-3xl font-bold text-purple-600">{utilization}%</div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              SOP Quality Rating (1-10)
            </label>
            <input
              type="number"
              value={formData.sop_quality_rating || ''}
              onChange={(e) => handleNumberChange('sop_quality_rating', e.target.value)}
              placeholder="7"
              min="1"
              max="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Team Capacity Risk
            </label>
            <select
              value={formData.team_capacity_risk || 'Medium'}
              onChange={(e) => setFormData(prev => ({ ...prev, team_capacity_risk: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Delivery Model
          </label>
          <input
            type="text"
            value={formData.delivery_model || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, delivery_model: e.target.value }))}
            placeholder="e.g., Fixed scope, Time & materials, Hybrid"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Biggest Bottlenecks
          </label>
          <textarea
            value={formData.biggest_bottlenecks || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, biggest_bottlenecks: e.target.value }))}
            placeholder="What are the main constraints in your delivery? Where do you get stuck?"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      <FormNavigation onBack={onBack} />
    </form>
  )
}
