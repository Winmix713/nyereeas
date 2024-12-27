'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useUser } from '@/contexts/UserContext'

export default function LoginPanel() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useUser()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'takosadam@gmail.com' && password === 'takosadam') {
      login({ email, username: 'takosadam' })
    } else {
      setError('Hibás email vagy jelszó')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="glass-effect rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-[#CCFF00]">Bejelentkezés</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email cím
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 rounded-xl border border-white/10 focus:border-[#CCFF00]/50 focus:outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Jelszó
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-black/30 rounded-xl border border-white/10 focus:border-[#CCFF00]/50 focus:outline-none transition-colors"
              required
            />
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#CCFF00] to-[#9EFF00] text-black font-medium rounded-xl hover:opacity-90 transition-opacity"
          >
            Bejelentkezés
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

