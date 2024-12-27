'use client'

import { TypeIcon as type, LucideIcon } from 'lucide-react'

interface MetricsCardProps {
  title: string
  value: string | number
  change: number
  icon: LucideIcon
}

export function MetricsCard({ title, value, change, icon: Icon }: MetricsCardProps) {
  const isPositive = change >= 0

  return (
    <div className="glass-effect rounded-xl p-6 transition-all duration-200 hover:scale-105">
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-lg bg-[#CCFF00]/10">
          <Icon className="w-5 h-5 text-[#CCFF00]" />
        </div>
        <div className={`px-2 py-1 text-xs rounded-full ${
          isPositive ? 'bg-[#CCFF00]/10 text-[#CCFF00]' : 'bg-red-500/10 text-red-500'
        }`}>
          {isPositive ? '+' : ''}{change}%
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-sm text-gray-400">{title}</h3>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
    </div>
  )
}

