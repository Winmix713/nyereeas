'use client'

import { useState } from 'react'
import { useUser } from '@/contexts/UserContext'
import { motion } from 'framer-motion'
import { Menu, ChevronDown } from 'lucide-react'
import AdminPanel from './AdminPanel'
import { SparklesText } from './SparklesText'
import { LampEffect } from './LampEffect'

export default function Header() {
  const { user, logout } = useUser()
  const [showMenu, setShowMenu] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 glass-effect">
      <div className="container mx-auto px-4 py-2 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4 w-full sm:w-auto justify-between"
          >
            <LampEffect>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tighter logo">
                <SparklesText>
                  win<span className="text-[#CCFF00]">mix</span>
                </SparklesText>
                <span className="text-xs text-[#CCFF00] ml-1">.hu</span>
              </h1>
            </LampEffect>
            {user && (
              <div className="flex space-x-2 sm:hidden">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="btn-modern p-2 rounded-full bg-[#CCFF00] text-black"
                >
                  <Menu size={24} />
                </button>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center space-x-4"
          >
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowAdminPanel(!showAdminPanel)}
                  className="glass-effect px-4 py-2 rounded-full flex items-center space-x-2 hover:border-[#CCFF00]/30 transition-colors"
                >
                  <span className="text-[#CCFF00]">👋</span>
                  <span>{user.username}</span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${
                      showAdminPanel ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {showAdminPanel && (
                  <AdminPanel onClose={() => setShowAdminPanel(false)} />
                )}
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>

      {showMenu && user && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-md p-4">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => {
                setShowAdminPanel(!showAdminPanel)
                setShowMenu(false)
              }}
              className="glass-effect px-4 py-2 rounded-full flex items-center justify-between"
            >
              <span>
                <span className="text-[#CCFF00]">👋</span>
                <span className="ml-2">{user.username}</span>
              </span>
              <ChevronDown className={`w-4 h-4 ${showAdminPanel ? 'rotate-180' : ''}`} />
            </button>
            {showAdminPanel && (
              <AdminPanel onClose={() => setShowAdminPanel(false)} />
            )}
          </div>
        </div>
      )}
    </header>
  )
}

