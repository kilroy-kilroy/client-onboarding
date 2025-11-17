'use client'

import { useState } from 'react'
import type { ClientsData } from '@/types/onboarding'
import FormNavigation from '../FormNavigation'

interface ClientsStepProps {
  initialData?: ClientsData
  onNext: (data: ClientsData) => void
  onBack: () => void
}

const PROFITABILITY_OPTIONS = ['Low', 'Medium', 'High']
const CHURN_RISK_OPTIONS = ['Low', 'Medium', 'High']

export default function ClientsStep({ initialData, onNext, onBack }: ClientsStepProps) {
  const [clients, setClients] = useState(initialData?.clients || [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ clients: clients.filter(c => c.client_name.trim() !== '') })
  }

  const addClient = () => {
    setClients([...clients, {
      client_name: '',
      industry: '',
      monthly_value: undefined,
      profitability_rating: 'Medium',
      fit_rating: 7,
      duration_months: undefined,
      churn_risk: 'Low',
      notes: ''
    }])
  }

  const removeClient = (index: number) => {
    setClients(clients.filter((_, i) => i !== index))
  }

  const updateClient = (index: number, field: string, value: any) => {
    const updated = [...clients]
    updated[index] = { ...updated[index], [field]: value }
    setClients(updated)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Client Portfolio</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Add your current clients. This helps calculate your ideal client fit score and portfolio health.
      </p>

      <div className="space-y-6">
        {clients.length === 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              You can skip this for now and add clients later, but having this data helps generate better insights.
            </p>
          </div>
        )}

        {clients.map((client, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Client {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeClient(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={client.client_name}
                  onChange={(e) => updateClient(index, 'client_name', e.target.value)}
                  placeholder="Company name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  value={client.industry || ''}
                  onChange={(e) => updateClient(index, 'industry', e.target.value)}
                  placeholder="e.g., SaaS, E-commerce"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Monthly Value ($)
                </label>
                <input
                  type="number"
                  value={client.monthly_value || ''}
                  onChange={(e) => updateClient(index, 'monthly_value', parseFloat(e.target.value) || undefined)}
                  placeholder="5000"
                  min="0"
                  step="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Duration (months)
                </label>
                <input
                  type="number"
                  value={client.duration_months || ''}
                  onChange={(e) => updateClient(index, 'duration_months', parseInt(e.target.value) || undefined)}
                  placeholder="12"
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Profitability Rating
                </label>
                <select
                  value={client.profitability_rating || 'Medium'}
                  onChange={(e) => updateClient(index, 'profitability_rating', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {PROFITABILITY_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fit Rating (1-10)
                </label>
                <input
                  type="number"
                  value={client.fit_rating || 7}
                  onChange={(e) => updateClient(index, 'fit_rating', parseInt(e.target.value) || 7)}
                  min="1"
                  max="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Churn Risk
                </label>
                <select
                  value={client.churn_risk || 'Low'}
                  onChange={(e) => updateClient(index, 'churn_risk', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                >
                  {CHURN_RISK_OPTIONS.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Notes
                </label>
                <textarea
                  value={client.notes || ''}
                  onChange={(e) => updateClient(index, 'notes', e.target.value)}
                  placeholder="Any important context about this client?"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addClient}
          className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500"
        >
          + Add Client
        </button>
      </div>

      <FormNavigation onBack={onBack} />
    </form>
  )
}
