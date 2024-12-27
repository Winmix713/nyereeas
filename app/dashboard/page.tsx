import { PredictionsDashboard } from '@/components/dashboard/PredictionsDashboard'

export default function DashboardPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-[#CCFF00]">Predikciós Áttekintés</h1>
      <PredictionsDashboard />
    </main>
  )
}

