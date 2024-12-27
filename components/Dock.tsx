'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Home, BarChart2, Star, Clock, Settings } from 'lucide-react'

interface DockItemProps {
  icon: React.ReactNode
  label: string
  href: string
  mouseX: number
  isActive?: boolean
}

function DockItem({ icon, label, href, mouseX, isActive }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth)
    }
  }, [])

  const distance = ref.current
    ? mouseX - (ref.current.offsetLeft + width / 2)
    : 0
  const scale = Math.max(
    1,
    1.5 - Math.min(Math.abs(distance) / 100, 0.5)
  )

  return (
    <Link href={href} className="group relative flex items-center justify-center">
      <motion.div
        ref={ref}
        style={{ scale }}
        className={`relative flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${
          isActive ? 'bg-[#CCFF00] text-black' : 'bg-black/20 text-white hover:bg-black/40'
        }`}
      >
        {icon}
      </motion.div>
      <AnimatePresence>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: -36 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute hidden whitespace-nowrap rounded-md bg-black/90 px-3 py-1.5 text-sm text-white group-hover:block"
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </Link>
  )
}

export default function Dock() {
  const [mouseX, setMouseX] = useState(0)
  const dockRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect()
      setMouseX(e.clientX - rect.left)
    }
  }

  const handleMouseLeave = () => {
    setMouseX(0)
  }

  const items = [
    { icon: <Home className="h-6 w-6" />, label: "Home", href: "/" },
    { icon: <BarChart2 className="h-6 w-6" />, label: "Statisztikák", href: "/statistics" },
    { icon: <Star className="h-6 w-6" />, label: "Kedvencek", href: "/favorites" },
    { icon: <Clock className="h-6 w-6" />, label: "Legutóbbi", href: "/recent" },
    { icon: <Settings className="h-6 w-6" />, label: "Beállítások", href: "/settings" },
  ]

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div
        ref={dockRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex items-end gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-md"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            {...item}
            mouseX={mouseX}
            isActive={index === 0} // Set active based on current route
          />
        ))}
      </div>
    </div>
  )
}

