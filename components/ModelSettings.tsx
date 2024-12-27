'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, RefreshCw, AlertCircle } from 'lucide-react'

interface ModelParameter {
  id: string
  name: string
  value: number
  min: number
  max: number
  description: string
}

export default function ModelSettings() {
  const [parameters, setParameters] = useState<ModelParameter[]>([
    {
      id: '1',
      name: 'Tanulási Ráta',
      value: 0.001,
      min: 0.0001,
      max: 0.01,
      description: 'A modell tanulási sebességének beállítása'
    },
    {
      id: '2',
      name: 'Batch Méret',
      value: 32,
      min: 8,
      max: 128,
      description: 'Az egyszerre feldolgozott minták száma'
    },
    // Add more parameters
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#CCFF00]">Modell Beállítások</h1>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-[#CCFF00] text-black rounded-lg font-medium hover:bg-[#CCFF00]/90 flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Mentés</span>
          </button>
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {parameters.map(param => (
          <motion.div
            key={param.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-6 rounded-xl"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-medium text-lg">{param.name}</h3>
                <p className="text-gray-400 text-sm">{param.description}</p>
              </div>
              <button className="text-gray-400 hover:text-[#CCFF00]">
                <AlertCircle className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              <input
                type="range"
                min={param.min}
                max={param.max}
                step={(param.max - param.min) / 100}
                value={param.value}
                onChange={(e) => {
                  const newParameters = [...parameters]
                  const index = parameters.findIndex(p => p.id === param.id)
                  newParameters[index] = {
                    ...param,
                    value: parseFloat(e.target.value)
                  }
                  setParameters(newParameters)
                }}
                className="w-full"
              />
              <div className="flex justify-between text-sm">
                <span>{param.min}</span>
                <span className="font-medium">{param.value}</span>
                <span>{param.max}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

