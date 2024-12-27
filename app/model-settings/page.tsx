'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ModelSettings from '@/components/ModelSettings'
import { useUser } from '@/contexts/UserContext'

export default function ModelSettingsPage() {
  const { user } = useUser()

  if (!user) {
    return null
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-20">
        <ModelSettings />
      </main>
      <Footer />
    </>
  )
}

