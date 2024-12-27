'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import UserProfile from '@/components/UserProfile'
import { useUser } from '@/contexts/UserContext'

export default function ProfilePage() {
  const { user } = useUser()

  if (!user) {
    return null
  }

  return (
    <>
      <Header />
      <main className="flex-grow pt-20">
        <UserProfile />
      </main>
      <Footer />
    </>
  )
}

