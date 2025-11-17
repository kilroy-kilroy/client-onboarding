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
    onNext({ competitors: competitors.filter(c => c.competitor_name.trim() !== '') })
  }

  const addCompetitor = () => {
    setCompetitors([...competitors, {
      competitor_name: '',
      url: '',
      positioning_summary: '',
      strengths: '',
      weaknesses: '',
      differentiation_opportunities: ''
    }])
  }

  const removeCompetitor = (index: number) => {
    setCompetitors(competitors.filter((_, i) => i !== index))
  }

  const updateCompetitor = (index: number, field: string, value: string) => {
    const updated = [...competitors]
    updated[index] = { ...updated[index], [field]: value }
    setCompetitors(updated)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">Competitive Landscape</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Identify your main competitors and how you differentiate from them.
      </p>

      <div className="space-y-6">
        {competitors.length === 0 && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Optional but valuable: Understanding your competitive landscape helps sharpen your positioning.
            </p>
          </div>
        )}

        {competitors.map((competitor, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Competitor {index + 1}</h3>
              <button
                type="button"
                onClick={() => removeCompetitor(index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Competitor Name *
                  </label>
                  <input
                    type="text"
                    value={competitor.competitor_name}
                    onChange={(e) => updateCompetitor(index, 'competitor_name', e.target.value)}
                    placeholder="Agency name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={competitor.url || ''}
                    onChange={(e) => updateCompetitor(index, 'url', e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Their Positioning
                </label>
                <textarea
                  value={competitor.positioning_summary || ''}
                  onChange={(e) => updateCompetitor(index, 'positioning_summary', e.target.value)}
                  placeholder="How do they position themselves in the market?"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Their Strengths
                  </label>
                  <textarea
                    value={competitor.strengths || ''}
                    onChange={(e) => updateCompetitor(index, 'strengths', e.target.value)}
                    placeholder="What do they do well?"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Their Weaknesses
                  </label>
                  <textarea
                    value={competitor.weaknesses || ''}
                    onChange={(e) => updateCompetitor(index, 'weaknesses', e.target.value)}
                    placeholder="Where do they fall short?"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Differentiation Opportunities
                </label>
                <textarea
                  value={competitor.differentiation_opportunities || ''}
                  onChange={(e) => updateCompetitor(index, 'differentiation_opportunities', e.target.value)}
                  placeholder="How can you stand out against them?"
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addCompetitor}
          className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-primary-500 hover:text-primary-500"
        >
          + Add Competitor
        </button>
      </div>

      <FormNavigation onBack={onBack} />
    </form>
  )
}
