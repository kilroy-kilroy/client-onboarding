'use client'

import { useState } from 'react'

interface AIAnalysisProps {
  companyId: string
}

export default function AIAnalysis({ companyId }: AIAnalysisProps) {
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [goForwardPlan, setGoForwardPlan] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'analysis' | 'plan'>('analysis')

  const generateAnalysis = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId }),
      })

      const data = await response.json()
      if (response.ok) {
        setAnalysis(data.analysis)
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Analysis error:', error)
      alert('Failed to generate analysis')
    } finally {
      setLoading(false)
    }
  }

  const generateGoForwardPlan = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/ai/go-forward-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId }),
      })

      const data = await response.json()
      if (response.ok) {
        setGoForwardPlan(data.plan)
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error('Plan generation error:', error)
      alert('Failed to generate plan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">AI Intelligence</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('analysis')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeTab === 'analysis'
              ? 'border-primary-600 text-primary-600 font-semibold'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          Agency Snapshot
        </button>
        <button
          onClick={() => setActiveTab('plan')}
          className={`pb-2 px-1 border-b-2 transition-colors ${
            activeTab === 'plan'
              ? 'border-primary-600 text-primary-600 font-semibold'
              : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          90-Day Plan
        </button>
      </div>

      {/* Agency Snapshot Tab */}
      {activeTab === 'analysis' && (
        <div>
          {!analysis ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Generate an AI-powered Agency Snapshot based on all your data.
              </p>
              <button
                onClick={generateAnalysis}
                disabled={loading}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : 'Generate Agency Snapshot'}
              </button>
            </div>
          ) : (
            <div className="prose dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap">{analysis}</div>
              <button
                onClick={generateAnalysis}
                disabled={loading}
                className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Regenerate
              </button>
            </div>
          )}
        </div>
      )}

      {/* Go Forward Plan Tab */}
      {activeTab === 'plan' && (
        <div>
          {!goForwardPlan ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Generate a comprehensive 90-Day Go Forward Plan with actionable steps.
              </p>
              <button
                onClick={generateGoForwardPlan}
                disabled={loading}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : 'Generate 90-Day Plan'}
              </button>
            </div>
          ) : (
            <div className="prose dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap">{goForwardPlan}</div>
              <button
                onClick={generateGoForwardPlan}
                disabled={loading}
                className="mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Regenerate
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
