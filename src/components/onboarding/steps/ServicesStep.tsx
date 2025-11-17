'use client'

import { useState } from 'react'
import type { ServicesData } from '@/types/onboarding'
import FormNavigation from '../FormNavigation'

interface ServicesStepProps {
  initialData?: ServicesData
  onNext: (data: ServicesData) => void
  onBack: () => void
}

const DELIVERY_MODEL_OPTIONS = ['Retainer', 'Project', 'Hybrid', 'Performance', 'Other']

export default function ServicesStep({ initialData, onNext, onBack }: ServicesStepProps) {
  const [services, setServices] = useState(
    initialData?.services || [{ service_name: '', description: '', price_range: '', delivery_model: 'Retainer', delivery_constraints: '' }]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ services: services.filter(s => s.service_name.trim() !== '') })
  }

  const addService = () => {
    setServices([...services, { service_name: '', description: '', price_range: '', delivery_model: 'Retainer', delivery_constraints: '' }])
  }

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index))
  }

  const updateService = (index: number, field: string, value: any) => {
    const updated = [...services]
    updated[index] = { ...updated[index], [field]: value }
    setServices(updated)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Services & Offers</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Define the services you offer to clients. Be specific about delivery models and pricing.
      </p>

      <div className="space-y-6">
        {services.map((service, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Service {index + 1}</h3>
              {services.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeService(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Service Name *
                </label>
                <input
                  type="text"
                  value={service.service_name}
                  onChange={(e) => updateService(index, 'service_name', e.target.value)}
                  placeholder="e.g., Paid Media Management, SEO Consulting"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={service.description || ''}
                  onChange={(e) => updateService(index, 'description', e.target.value)}
                  placeholder="What's included in this service? What outcomes do you deliver?"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Price Range
                  </label>
                  <input
                    type="text"
                    value={service.price_range || ''}
                    onChange={(e) => updateService(index, 'price_range', e.target.value)}
                    placeholder="e.g., $5k-$15k/mo"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Delivery Model *
                  </label>
                  <select
                    value={service.delivery_model || 'Retainer'}
                    onChange={(e) => updateService(index, 'delivery_model', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  >
                    {DELIVERY_MODEL_OPTIONS.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Delivery Constraints / Notes
                </label>
                <textarea
                  value={service.delivery_constraints || ''}
                  onChange={(e) => updateService(index, 'delivery_constraints', e.target.value)}
                  placeholder="Any limitations? Special requirements? Team needs?"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addService}
          className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500"
        >
          + Add Another Service
        </button>
      </div>

      <FormNavigation onBack={onBack} />
    </form>
  )
}
