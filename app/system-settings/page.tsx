'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SystemSettings from '@/components/SystemSettings'
import { useUser } from '@/contexts/UserContext'

export default function SystemSettingsPage() {
  const { user } = useUser()

  if (!user) {
    return null
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-20">
        <SystemSettings />
      </main>
      <Footer />
    </>
  )
}

