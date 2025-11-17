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

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Financials</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Provide financial overview (optional for now).</p>
      <FormNavigation onBack={onBack} />
    </form>
  )
}
