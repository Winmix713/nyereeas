'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, CheckCircle, DollarSign } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change: string
  isPositive: boolean
  icon: React.ReactNode
}

const StatCard = ({ title, value, change, isPositive, icon }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-effect rounded-xl p-4"
  >
    <div className="flex items-start justify-between">
      <div className="bg-[#CCFF00]/10 p-2 rounded-lg">
        {icon}
      </div>
      <div className={`px-2 py-1 rounded-full text-xs ${
        isPositive ? 'bg-[#CCFF00]/10 text-[#CCFF00]' : 'bg-red-500/10 text-red-500'
      }`}>
        {change}
      </div>
    </div>
    <div className="mt-4">
      <h3 className="text-sm text-gray-400">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  </motion.div>
)

interface WeeklyStatsProps {
  data: number[]
}

const WeeklyStats = ({ data }: WeeklyStatsProps) => (
  <div className="glass-effect rounded-xl p-6">
    <h3 className="text-lg font-medium mb-4">Heti predikciós pontosság</h3>
    <div className="flex items-end h-48 gap-2">
      {['H', 'K', 'Sze', 'Cs', 'P', 'Szo', 'V'].map((day, index) => (
        <div key={day} className="flex-1 flex flex-col items-center gap-2">
          <div 
            className="w-full bg-[#CCFF00] rounded-t-sm transition-all duration-300 hover:opacity-75"
            style={{ height: `${data[index]}%` }}
          />
          <span className="text-xs text-gray-400">{day}</span>
        </div>
      ))}
    </div>
  </div>
)

export default function StatsOverview() {
  const weeklyData = [58, 42, 75, 85, 45, 65, 52]
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Sikeres predikciók"
          value="85%"
          change="+12%"
          isPositive={true}
          icon={<CheckCircle className="w-6 h-6 text-[#CCFF00]" />}
        />
        <StatCard
          title="Aktív felhasználók"
          value="2,845"
          change="+8%"
          isPositive={true}
          icon={<Users className="w-6 h-6 text-[#CCFF00]" />}
        />
        <StatCard
          title="Mai predikciók"
          value="147"
          change="-3%"
          isPositive={false}
          icon={<TrendingUp className="w-6 h-6 text-[#CCFF00]" />}
        />
        <StatCard
          title="Átlagos nyereség"
          value="1.92x"
          change="+5%"
          isPositive={true}
          icon={<DollarSign className="w-6 h-6 text-[#CCFF00]" />}
        />
      </div>

      <WeeklyStats data={weeklyData} />

      <div className="flex gap-4">
        <button className="flex-1 bg-white text-black font-medium py-2 rounded-lg">
          Mérkőzések
        </button>
        <button className="flex-1 bg-gray-800 text-white font-medium py-2 rounded-lg">
          Predikciók
        </button>
      </div>
    </div>
  )
}

