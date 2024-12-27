'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HelpDocs from '@/components/HelpDocs'
import { useUser } from '@/contexts/UserContext'

export default function HelpPage() {
  const { user } = useUser()

  if (!user) {
    return null
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-20">
        <HelpDocs />
      </main>
      <Footer />
    </>
  )
}

