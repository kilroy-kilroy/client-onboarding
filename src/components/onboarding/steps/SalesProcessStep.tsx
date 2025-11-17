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

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Sales & Lead Generation</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Describe your sales process (optional for now).</p>
      <FormNavigation onBack={onBack} />
    </form>
  )
}
