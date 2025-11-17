'use client'

import { useState } from 'react'
import type { FinancialsData } from '@/types/onboarding'
import FormNavigation from '../FormNavigation'

interface FinancialsStepProps {
  initialData?: FinancialsData
  onNext: (data: FinancialsData) => void
  onBack: () => void
}

export default function FinancialsStep({ initialData, onNext, onBack }: FinancialsStepProps) {
  const [formData, setFormData] = useState<FinancialsData>(initialData || {})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext(formData)
  }

  const handleChange = (field: keyof FinancialsData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value ? parseFloat(value) : undefined
    }))
  }

  const grossMargin = formData.revenue && formData.cost_of_delivery
    ? ((formData.revenue - formData.cost_of_delivery) / formData.revenue * 100).toFixed(1)
    : null

  const netProfit = formData.revenue && formData.cost_of_delivery && formData.operating_costs
    ? ((formData.revenue - formData.cost_of_delivery - formData.operating_costs) / formData.revenue * 100).toFixed(1)
    : null

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Financials</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Financial data for the current month. All fields optional, but helps calculate profitability metrics.
      </p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Monthly Revenue ($)
            </label>
            <input
              type="number"
              value={formData.revenue || ''}
              onChange={(e) => handleChange('revenue', e.target.value)}
              placeholder="50000"
              min="0"
              step="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cost of Delivery ($)
            </label>
            <input
              type="number"
              value={formData.cost_of_delivery || ''}
              onChange={(e) => handleChange('cost_of_delivery', e.target.value)}
              placeholder="20000"
              min="0"
              step="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Operating Costs ($)
            </label>
            <input
              type="number"
              value={formData.operating_costs || ''}
              onChange={(e) => handleChange('operating_costs', e.target.value)}
              placeholder="15000"
              min="0"
              step="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {grossMargin && (
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <div className="text-xs text-gray-600 dark:text-gray-400">Gross Margin</div>
              <div className="text-2xl font-bold text-green-600">{grossMargin}%</div>
            </div>
          )}
        </div>

        {netProfit && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Net Profit Margin</div>
            <div className="text-3xl font-bold text-blue-600">{netProfit}%</div>
          </div>
        )}

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <h3 className="font-semibold mb-4">Goals & Targets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Monthly Revenue ($)
              </label>
              <input
                type="number"
                value={formData.target_revenue_goal || ''}
                onChange={(e) => handleChange('target_revenue_goal', e.target.value)}
                placeholder="100000"
                min="0"
                step="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Monthly Profit ($)
              </label>
              <input
                type="number"
                value={formData.target_profit_goal || ''}
                onChange={(e) => handleChange('target_profit_goal', e.target.value)}
                placeholder="30000"
                min="0"
                step="1000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>
        </div>
      </div>

      <FormNavigation onBack={onBack} />
    </form>
  )
}
