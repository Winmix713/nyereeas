'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Bell, Shield, Database, Clock, Mail } from 'lucide-react'

interface Setting {
  id: string
  name: string
  description: string
  enabled: boolean
  icon: React.ElementType
}

export default function SystemSettings() {
  const [settings, setSettings] = useState<Setting[]>([
    {
      id: '1',
      name: 'Értesítések',
      description: 'Email értesítések küldése az új predikciókról',
      enabled: true,
      icon: Bell
    },
    {
      id: '2',
      name: 'Biztonsági mentés',
      description: 'Automatikus biztonsági mentés naponta',
      enabled: true,
      icon: Shield
    },
    {
      id: '3',
      name: 'Adatbázis karbantartás',
      description: 'Automatikus optimalizálás és tisztítás',
      enabled: false,
      icon: Database
    },
    {
      id: '4',
      name: 'Időzített feladatok',
      description: 'Háttérfolyamatok ütemezése',
      enabled: true,
      icon: Clock
    },
    {
      id: '5',
      name: 'Email jelentések',
      description: 'Heti összefoglaló jelentések küldése',
      enabled: false,
      icon: Mail
    }
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#CCFF00]">Rendszer Beállítások</h1>
        <button className="px-4 py-2 bg-[#CCFF00] text-black rounded-lg font-medium hover:bg-[#CCFF00]/90 flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Mentés</span>
        </button>
      </div>

      <div className="space-y-4">
        {settings.map(setting => (
          <motion.div
            key={setting.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-6 rounded-xl"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gray-800 p-3 rounded-lg">
                <setting.icon className="w-6 h-6 text-[#CCFF00]" />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-lg">{setting.name}</h3>
                <p className="text-gray-400 text-sm">{setting.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={setting.enabled}
                  onChange={() => {
                    const newSettings = settings.map(s =>
                      s.id === setting.id ? { ...s, enabled: !s.enabled } : s
                    )
                    setSettings(newSettings)
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#CCFF00]"></div>
              </label>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

