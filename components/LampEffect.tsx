'use client'

import { motion } from 'framer-motion'

interface LampEffectProps {
  children: React.ReactNode
}

export function LampEffect({ children }: LampEffectProps) {
  return (
    <div className="relative">
      <motion.div
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(204, 255, 0, 0.15) 0%, transparent 70%)`,
          filter: 'blur(20px)',
        }}
      />
      {children}
    </div>
  )
}

