import { supabaseAdmin } from '@/lib/supabase/server'
import AIAnalysis from '@/components/dashboard/AIAnalysis'

interface DashboardPageProps {
  params: {
    companyId: string
  }
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { companyId } = params

  // Fetch company overview
  const { data: company, error } = await supabaseAdmin
    .from('company_overview')
    .select('*')
    .eq('id', companyId)
    .single()

  if (error || !company) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-4">Agency Not Found</h1>
        <p className="text-gray-600">Unable to load company data.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{company.company_name}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {company.industry_niche || 'Agency Intelligence Dashboard'}
          </p>
        </div>

        {/* WTF Health Score */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Overall Health Score
            </h3>
            <p className="text-3xl font-bold text-primary-600">
              {company.overall_wtf_health_score?.toFixed(1) || 'N/A'}
            </p>
            <p className="text-xs text-gray-500 mt-1">out of 10</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Client Fit Score
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {company.ideal_client_fit_score?.toFixed(1) || 'N/A'}
            </p>
            <p className="text-xs text-gray-500 mt-1">out of 10</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Sales Health Score
            </h3>
            <p className="text-3xl font-bold text-blue-600">
              {company.sales_health_score?.toFixed(1) || 'N/A'}
            </p>
            <p className="text-xs text-gray-500 mt-1">out of 10</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Ops Health Score
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {company.ops_health_score?.toFixed(1) || 'N/A'}
            </p>
            <p className="text-xs text-gray-500 mt-1">out of 10</p>
          </div>
        </div>

        {/* Company Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Company Details</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Location</dt>
                <dd className="font-medium">{company.hq_location || 'Not specified'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Founded</dt>
                <dd className="font-medium">{company.founded || 'Not specified'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Team Size</dt>
                <dd className="font-medium">{company.team_size || 'Not specified'}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Revenue Range</dt>
                <dd className="font-medium">{company.revenue_range || 'Not specified'}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Portfolio Overview</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Total Clients</dt>
                <dd className="font-medium text-2xl">{company.total_clients || 0}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Services Offered</dt>
                <dd className="font-medium text-2xl">{company.total_services || 0}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Team Overview</h3>
            <dl className="space-y-2">
              <div>
                <dt className="text-sm text-gray-500">Leadership</dt>
                <dd className="font-medium text-2xl">{company.total_leadership || 0}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Team Members</dt>
                <dd className="font-medium text-2xl">{company.total_team_members || 0}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* AI Intelligence Section */}
        <div className="mb-8">
          <AIAnalysis companyId={companyId} />
        </div>

        {/* Next Actions */}
        <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">→</span>
              <span>Complete remaining onboarding sections for full intelligence profile</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">→</span>
              <span>Use AI-generated insights to refine your strategy (see above)</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary-600 mr-2">→</span>
              <span>Feed data into Roadmap, GEN+, FYFS, DemandOS programs</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
