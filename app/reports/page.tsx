'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ReportsAnalytics from '@/components/ReportsAnalytics'
import { useUser } from '@/contexts/UserContext'

export default function ReportsPage() {
  const { user } = useUser()

  if (!user) {
    return null
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-20">
        <ReportsAnalytics />
      </main>
      <Footer />
    </>
  )
}

