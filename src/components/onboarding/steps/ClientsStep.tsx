'use client'

import { useState } from 'react'
import type { ClientsData } from '@/types/onboarding'
import FormNavigation from '../FormNavigation'

interface ClientsStepProps {
  initialData?: ClientsData
  onNext: (data: ClientsData) => void
  onBack: () => void
}

export default function ClientsStep({ initialData, onNext, onBack }: ClientsStepProps) {
  const [clients, setClients] = useState(initialData?.clients || [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onNext({ clients })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Client Portfolio</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Add your current clients (optional for now).</p>
      <FormNavigation onBack={onBack} />
    </form>
  )
}
