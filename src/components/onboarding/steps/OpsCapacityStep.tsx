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

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Operations & Capacity</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Describe your operational capacity (optional for now).</p>
      <FormNavigation onBack={onBack} />
    </form>
  )
}
