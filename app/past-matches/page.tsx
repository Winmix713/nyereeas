'use client'

import { useState } from 'react'
import PastMatches from '@/components/PastMatches'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useUser } from '@/contexts/UserContext'

export default function PastMatchesPage() {
  const { user } = useUser()

  if (!user) {
    return null // Or redirect to login
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-20">
        <PastMatches />
      </main>
      <Footer />
    </>
  )
}

