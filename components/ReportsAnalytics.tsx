'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Filter, Calendar, TrendingUp, PieChart, BarChart } from 'lucide-react'

export default function ReportsAnalytics() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#CCFF00]">Riportok és Elemzések</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700">
            <Calendar className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex space-x-4 mb-6">
        {[
          { id: 'overview', label: 'Áttekintés', icon: TrendingUp },
          { id: 'predictions', label: 'Predikciók', icon: PieChart },
          { id: 'performance', label: 'Teljesítmény', icon: BarChart }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
              activeTab === tab.id
                ? 'bg-[#CCFF00] text-black'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-effect p-6 rounded-xl"
          >
            <h3 className="font-medium mb-4">Statisztika {i + 1}</h3>
            <div className="h-40 bg-gray-800/50 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Graf {i + 1}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

