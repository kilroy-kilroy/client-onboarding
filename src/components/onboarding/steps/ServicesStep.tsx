'use client'

import { useState } from 'react'
import type { ServicesData } from '@/types/onboarding'
import FormNavigation from '../FormNavigation'

interface ServicesStepProps {
  initialData?: ServicesData
  onNext: (data: ServicesData) => void
  onBack: () => void
}

export default function ServicesStep({ initialData, onNext, onBack }: ServicesStepProps) {
  const [services, setServices] = useState(initialData?.services || [{ service_name: '', description: '', delivery_model: 'Retainer' }])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ services: services.filter(s => s.service_name.trim() !== '') })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Services & Offers</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Add the services you offer to clients.</p>
      {/* Simplified - full implementation would be similar to Team/Leadership */}
      <FormNavigation onBack={onBack} />
    </form>
  )
}
