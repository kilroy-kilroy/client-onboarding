'use client'

import { useState } from 'react'
import type { CompetitorsData } from '@/types/onboarding'
import FormNavigation from '../FormNavigation'

interface CompetitorsStepProps {
  initialData?: CompetitorsData
  onNext: (data: CompetitorsData) => void
  onBack: () => void
}

export default function CompetitorsStep({ initialData, onNext, onBack }: CompetitorsStepProps) {
  const [competitors, setCompetitors] = useState(initialData?.competitors || [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ competitors })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Competitive Landscape</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Add competitors (optional for now).</p>
      <FormNavigation onBack={onBack} />
    </form>
  )
}
