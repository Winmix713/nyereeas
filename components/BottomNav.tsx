'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BarChart2, Star, Clock, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

const navItems = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: BarChart2, label: 'Stats', href: '/stats' },
  { icon: Star, label: 'Favorites', href: '/favorites' },
  { icon: Clock, label: 'Recent', href: '/recent' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 bg-black/80 backdrop-blur-lg px-4 py-2 rounded-xl border border-white/10"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors ${
                isActive ? 'text-[#CCFF00]' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#CCFF00]/10 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </motion.div>
    </div>
  )
}

