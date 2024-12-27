'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, User, Mail, Lock, Shield, Bell } from 'lucide-react'
import { useUser } from '@/contexts/UserContext'

interface ProfileSection {
  id: string
  title: string
  icon: React.ElementType
  fields: {
    id: string
    label: string
    type: string
    value: string
  }[]
}

export default function UserProfile() {
  const { user } = useUser()
  const [sections] = useState<ProfileSection[]>([
    {
      id: 'personal',
      title: 'Személyes adatok',
      icon: User,
      fields: [
        { id: 'name', label: 'Név', type: 'text', value: user?.username || '' },
        { id: 'email', label: 'Email', type: 'email', value: user?.email || '' }
      ]
    },
    {
      id: 'security',
      title: 'Biztonság',
      icon: Shield,
      fields: [
        { id: 'currentPassword', label: 'Jelenlegi jelszó', type: 'password', value: '' },
        { id: 'newPassword', label: 'Új jelszó', type: 'password', value: '' },
        { id: 'confirmPassword', label: 'Új jelszó megerősítése', type: 'password', value: '' }
      ]
    },
    {
      id: 'notifications',
      title: 'Értesítések',
      icon: Bell,
      fields: [
        { id: 'emailNotifications', label: 'Email értesítések', type: 'checkbox', value: 'true' },
        { id: 'pushNotifications', label: 'Push értesítések', type: 'checkbox', value: 'false' }
      ]
    }
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#CCFF00]">Felhasználói Profil</h1>
        <button className="px-4 py-2 bg-[#CCFF00] text-black rounded-lg font-medium hover:bg-[#CCFF00]/90 flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>Mentés</span>
        </button>
      </div>

      <div className="space-y-6">
        {sections.map(section => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect p-6 rounded-xl"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="bg-gray-800 p-3 rounded-lg">
                <section.icon className="w-6 h-6 text-[#CCFF00]" />
              </div>
              <h2 className="text-xl font-medium">{section.title}</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {section.fields.map(field => (
                <div key={field.id}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    {field.label}
                  </label>
                  {field.type === 'checkbox' ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.value === 'true'}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#CCFF00]"></div>
                    </label>
                  ) : (
                    <input
                      type={field.type}
                      value={field.value}
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg border border-gray-700 focus:border-[#CCFF00] focus:outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

