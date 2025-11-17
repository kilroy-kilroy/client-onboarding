import DashboardClient from './DashboardClient'

interface DashboardPageProps {
  params: {
    companyId: string
  }
}

export default function DashboardPage({ params }: DashboardPageProps) {
  return <DashboardClient companyId={params.companyId} />
}
