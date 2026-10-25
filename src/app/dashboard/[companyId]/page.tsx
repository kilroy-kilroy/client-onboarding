import DashboardClient from './DashboardClient'

interface DashboardPageProps {
  params: Promise<{
    companyId: string
  }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { companyId } = await params
  return <DashboardClient companyId={companyId} />
}
