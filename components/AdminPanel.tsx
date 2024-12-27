'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Settings, Database, History, HelpCircle, User, BarChart2, Sliders } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface AdminPanelProps {
  onClose: () => void
}

export default function AdminPanel({ onClose }: AdminPanelProps) {
  const router = useRouter()
  
  const menuItems = [
    { 
      id: 'predictions', 
      label: 'Predikciók',
      icon: LineChart,
      href: '/predictions'
    },
    { 
      id: 'modelSettings', 
      label: 'Modell és Predikció Beállítások',
      icon: Sliders,
      href: '/model-settings'
    },
    { 
      id: 'pastMatches', 
      label: 'Múltbeli Mérkőzések',
      icon: History,
      href: '/past-matches'
    },
    { 
      id: 'reports', 
      label: 'Riportok és Elemzések',
      icon: BarChart2,
      href: '/reports'
    },
    { 
      id: 'systemSettings', 
      label: 'Rendszer Beállítások',
      icon: Settings,
      href: '/system-settings'
    },
    { 
      id: 'help', 
      label: 'Súgó és Dokumentáció',
      icon: HelpCircle,
      href: '/help'
    },
    { 
      id: 'dbConnections', 
      label: 'Adatbázis Kapcsolatok',
      icon: Database,
      href: '/database'
    },
    { 
      id: 'userProfile', 
      label: 'Felhasználói fiók szerkesztése',
      icon: User,
      href: '/profile'
    }
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="absolute right-0 mt-2 w-72 origin-top-right"
        style={{
          filter: 'drop-shadow(0 0 20px rgba(204, 255, 0, 0.15))'
        }}
      >
        <div className="rounded-xl bg-black/90 backdrop-blur-md border border-[#CCFF00]/20 overflow-hidden">
          <div className="py-2">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ 
                  backgroundColor: 'rgba(204, 255, 0, 0.1)',
                  x: 4
                }}
                className="w-full px-4 py-2.5 text-left text-white hover:text-[#CCFF00] transition-colors duration-200 text-sm flex items-center space-x-3"
                onClick={() => {
                  router.push(item.href)
                  onClose()
                }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

