'use client'

import { TrendingUp, Users, CheckCircle, DollarSign } from 'lucide-react'
import { MetricsCard } from './MetricsCard'
import { WeeklyChart } from './WeeklyChart'
import type { PredictionStats, WeeklyAccuracy } from '@/types/stats'

const mockStats: PredictionStats = {
  successRate: { value: 85, change: 12 },
  activeUsers: { value: 2845, change: 8 },
  dailyPredictions: { value: 147, change: -3 },
  averageProfit: { value: 1.92, change: 5 }
}

const mockWeeklyData: WeeklyAccuracy = {
  data: [58, 42, 75, 85, 45, 65, 52],
  labels: ['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V']
}

export function PredictionsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Sikeres predikciók"
          value={`${mockStats.successRate.value}%`}
          change={mockStats.successRate.change}
          icon={CheckCircle}
        />
        <MetricsCard
          title="Aktív felhasználók"
          value={mockStats.activeUsers.value.toLocaleString()}
          change={mockStats.activeUsers.change}
          icon={Users}
        />
        <MetricsCard
          title="Mai predikciók"
          value={mockStats.dailyPredictions.value}
          change={mockStats.dailyPredictions.change}
          icon={TrendingUp}
        />
        <MetricsCard
          title="Átlagos nyereség"
          value={`${mockStats.averageProfit.value}x`}
          change={mockStats.averageProfit.change}
          icon={DollarSign}
        />
      </div>

      <WeeklyChart data={mockWeeklyData.data} labels={mockWeeklyData.labels} />

      <div className="flex gap-4">
        <button className="flex-1 bg-white text-black font-medium py-2 rounded-lg transition-opacity hover:opacity-90">
          Mérkőzések
        </button>
        <button className="flex-1 bg-gray-800 text-white font-medium py-2 rounded-lg transition-opacity hover:opacity-90">
          Predikciók
        </button>
      </div>
    </div>
  )
}

