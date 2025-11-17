'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import AIAnalysis from '@/components/dashboard/AIAnalysis'
import Image from 'next/image'

interface CompanyOverview {
  id: string
  company_name: string
  industry_niche: string | null
  hq_location: string | null
  founded: number | null
  team_size: number | null
  revenue_range: string | null
  total_clients: number
  total_services: number
  total_leadership: number
  total_team_members: number
  ideal_client_fit_score: number | null
  sales_health_score: number | null
  ops_health_score: number | null
  overall_wtf_health_score: number | null
}

export default function DashboardClient({ companyId }: { companyId: string }) {
  const [company, setCompany] = useState<CompanyOverview | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    checkAuthAndLoadData()
  }, [companyId])

  async function checkAuthAndLoadData() {
    try {
      // Check authentication
      const { data: { user }, error: authError } = await supabase.auth.getUser()

      if (authError || !user) {
        router.push('/login')
        return
      }

      // Fetch company data with authorization check
      const { data, error: fetchError } = await supabase
        .from('company_overview')
        .select('*')
        .eq('id', companyId)
        .single()

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          setError('You do not have permission to view this dashboard or the company does not exist.')
        } else {
          setError(fetchError.message)
        }
        setLoading(false)
        return
      }

      setCompany(data as CompanyOverview)
      setLoading(false)
    } catch (err: any) {
      setError(err.message || 'Failed to load dashboard')
      setLoading(false)
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-2xl font-anton uppercase">Loading...</p>
      </div>
    )
  }

  if (error || !company) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <h1 className="text-4xl font-anton uppercase text-brand-red mb-4">Access Denied</h1>
        <p className="text-gray-300 mb-6">
          {error || 'Unable to load company data. Fix your shit and try again.'}
        </p>
        <a
          href="/login"
          className="bg-brand-red text-white px-6 py-3 font-anton uppercase hover:bg-red-700 inline-block mr-4"
        >
          Login
        </a>
        <a
          href="/onboarding"
          className="bg-white text-black px-6 py-3 font-anton uppercase hover:bg-brand-yellow inline-block"
        >
          Start Onboarding
        </a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Logout */}
        <div className="flex justify-between items-start mb-8">
          <Image src="/logos/red-logo.svg" alt="Tim Kilroy" width={200} height={66} />
          <button
            onClick={handleLogout}
            className="bg-gray-800 text-white px-4 py-2 font-poppins text-sm hover:bg-gray-700 border-2 border-gray-700"
          >
            Logout
          </button>
        </div>

        {/* Header */}
        <div className="mb-8 border-l-4 border-brand-red pl-6">
          <h1 className="text-5xl font-anton uppercase mb-2 text-brand-yellow">{company.company_name}</h1>
          <p className="text-xl text-gray-300">{company.industry_niche || 'Agency Intelligence Dashboard'}</p>
        </div>

        {/* WTF Health Scores */}
        <div className="mb-12">
          <h2 className="text-3xl font-anton uppercase mb-6 text-brand-red">Your WTF Health Score</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-brand-red border-4 border-brand-yellow p-6">
              <h3 className="text-sm font-poppins font-medium text-brand-yellow mb-2 uppercase tracking-wide">
                Overall Health
              </h3>
              <p className="text-5xl font-anton text-white">
                {company.overall_wtf_health_score?.toFixed(1) || 'N/A'}
              </p>
              <p className="text-xs text-gray-200 mt-1">out of 10</p>
            </div>

            <div className="bg-gray-900 border-4 border-brand-red p-6">
              <h3 className="text-sm font-poppins font-medium text-brand-yellow mb-2 uppercase tracking-wide">
                Client Fit
              </h3>
              <p className="text-5xl font-anton text-brand-yellow">
                {company.ideal_client_fit_score?.toFixed(1) || 'N/A'}
              </p>
              <p className="text-xs text-gray-400 mt-1">out of 10</p>
            </div>

            <div className="bg-gray-900 border-4 border-brand-red p-6">
              <h3 className="text-sm font-poppins font-medium text-brand-yellow mb-2 uppercase tracking-wide">
                Sales Health
              </h3>
              <p className="text-5xl font-anton text-brand-yellow">
                {company.sales_health_score?.toFixed(1) || 'N/A'}
              </p>
              <p className="text-xs text-gray-400 mt-1">out of 10</p>
            </div>

            <div className="bg-gray-900 border-4 border-brand-red p-6">
              <h3 className="text-sm font-poppins font-medium text-brand-yellow mb-2 uppercase tracking-wide">
                Ops Health
              </h3>
              <p className="text-5xl font-anton text-brand-yellow">
                {company.ops_health_score?.toFixed(1) || 'N/A'}
              </p>
              <p className="text-xs text-gray-400 mt-1">out of 10</p>
            </div>
          </div>
        </div>

        {/* Company Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-anton uppercase mb-6 text-brand-red">The Fundamentals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-900 border-2 border-gray-700 p-6">
              <h3 className="text-xl font-anton uppercase mb-4 text-brand-yellow">Company Details</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-400 uppercase">Location</dt>
                  <dd className="font-poppins font-medium text-white">{company.hq_location || 'Not specified'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-400 uppercase">Founded</dt>
                  <dd className="font-poppins font-medium text-white">{company.founded || 'Not specified'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-400 uppercase">Team Size</dt>
                  <dd className="font-poppins font-medium text-white">{company.team_size || 'Not specified'}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-400 uppercase">Revenue Range</dt>
                  <dd className="font-poppins font-medium text-white">{company.revenue_range || 'Not specified'}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-gray-900 border-2 border-gray-700 p-6">
              <h3 className="text-xl font-anton uppercase mb-4 text-brand-yellow">Portfolio</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-400 uppercase">Total Clients</dt>
                  <dd className="font-anton text-4xl text-brand-red">{company.total_clients || 0}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-400 uppercase">Services Offered</dt>
                  <dd className="font-anton text-4xl text-brand-red">{company.total_services || 0}</dd>
                </div>
              </dl>
            </div>

            <div className="bg-gray-900 border-2 border-gray-700 p-6">
              <h3 className="text-xl font-anton uppercase mb-4 text-brand-yellow">Team</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm text-gray-400 uppercase">Leadership</dt>
                  <dd className="font-anton text-4xl text-brand-red">{company.total_leadership || 0}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-400 uppercase">Team Members</dt>
                  <dd className="font-anton text-4xl text-brand-red">{company.total_team_members || 0}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* AI Intelligence Section */}
        <div className="mb-8">
          <AIAnalysis companyId={companyId} />
        </div>

        {/* Next Actions */}
        <div className="bg-brand-red border-4 border-brand-yellow p-8">
          <h3 className="text-3xl font-anton uppercase mb-6 text-brand-yellow">What's Next</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="text-brand-yellow mr-3 text-2xl font-bold">→</span>
              <span className="text-white text-lg">Review your AI-generated insights above. They're not fluff.</span>
            </li>
            <li className="flex items-start">
              <span className="text-brand-yellow mr-3 text-2xl font-bold">→</span>
              <span className="text-white text-lg">Use your 90-Day Plan. Actually follow it.</span>
            </li>
            <li className="flex items-start">
              <span className="text-brand-yellow mr-3 text-2xl font-bold">→</span>
              <span className="text-white text-lg">
                Feed this data into your Operating Systems: Roadmap, GEN+, FYFS, DemandOS, GTM OS.
              </span>
            </li>
          </ul>
          <p className="text-center text-2xl font-anton uppercase mt-8 text-white">
            More Revenue. More Profit. More Happy.
          </p>
        </div>
      </div>
    </div>
  )
}
