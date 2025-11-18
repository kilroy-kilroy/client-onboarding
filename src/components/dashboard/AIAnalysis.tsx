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
    <div className="bg-gray-900 border-4 border-brand-red p-8">
      <h2 className="text-3xl font-anton uppercase mb-6 text-brand-red">AI Intelligence</h2>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b-2 border-brand-yellow">
        <button
          onClick={() => setActiveTab('analysis')}
          className={`pb-2 px-4 border-b-4 transition-colors font-anton uppercase ${
            activeTab === 'analysis'
              ? 'border-brand-red text-brand-yellow'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Agency Snapshot
        </button>
        <button
          onClick={() => setActiveTab('plan')}
          className={`pb-2 px-4 border-b-4 transition-colors font-anton uppercase ${
            activeTab === 'plan'
              ? 'border-brand-red text-brand-yellow'
              : 'border-transparent text-gray-400 hover:text-white'
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
              <p className="text-white font-poppins mb-6 text-lg">
                Generate an AI-powered Agency Snapshot based on all your data.
              </p>
              <button
                onClick={generateAnalysis}
                disabled={loading}
                className="px-8 py-4 bg-brand-red text-white font-anton text-xl uppercase border-4 border-brand-yellow hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Generating...' : 'Generate Agency Snapshot'}
              </button>
            </div>
          ) : (
            <div className="bg-black border-2 border-brand-yellow p-6">
              <div className="whitespace-pre-wrap text-white font-poppins leading-relaxed">{analysis}</div>
              <button
                onClick={generateAnalysis}
                disabled={loading}
                className="mt-6 px-6 py-3 bg-brand-yellow text-black font-anton uppercase hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
              <p className="text-white font-poppins mb-6 text-lg">
                Generate a comprehensive 90-Day Go Forward Plan with actionable steps.
              </p>
              <button
                onClick={generateGoForwardPlan}
                disabled={loading}
                className="px-8 py-4 bg-brand-red text-white font-anton text-xl uppercase border-4 border-brand-yellow hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Generating...' : 'Generate 90-Day Plan'}
              </button>
            </div>
          ) : (
            <div className="bg-black border-2 border-brand-yellow p-6">
              <div className="whitespace-pre-wrap text-white font-poppins leading-relaxed">{goForwardPlan}</div>
              <button
                onClick={generateGoForwardPlan}
                disabled={loading}
                className="mt-6 px-6 py-3 bg-brand-yellow text-black font-anton uppercase hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
