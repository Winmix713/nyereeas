'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Sparkle {
  id: string
  color: string
  size: number
  style: {
    top: string
    left: string
    zIndex: number
  }
}

const DEFAULT_COLOR = '#CCFF00'

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min

const generateSparkle = (color: string): Sparkle => ({
  id: Math.random().toString(36).slice(2),
  color,
  size: random(10, 20),
  style: {
    top: `${random(-20, 120)}%`,
    left: `${random(-20, 120)}%`,
    zIndex: random(1, 3),
  },
})

interface SparkleInstanceProps {
  color: string
  size: number
  style: React.CSSProperties
}

function SparkleInstance({ color, size, style }: SparkleInstanceProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      style={style}
      className="absolute"
      initial={{ scale: 0, rotate: 0 }}
      animate={{
        scale: [0, 1, 0],
        rotate: [0, 90, 180],
      }}
      transition={{
        duration: 1,
        repeat: 0,
        ease: "easeInOut",
      }}
    >
      <path
        d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
        fill={color}
      />
    </motion.svg>
  )
}

interface SparklesTextProps {
  children: React.ReactNode
  color?: string
}

export function SparklesText({ children, color = DEFAULT_COLOR }: SparklesTextProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const generateSparkles = () => {
      const sparkleCount = random(1, 4)
      const newSparkles = Array.from({ length: sparkleCount }).map(() =>
        generateSparkle(color)
      )
      setSparkles(newSparkles)
    }

    const interval = setInterval(generateSparkles, 1000)
    return () => clearInterval(interval)
  }, [color])

  return (
    <span className="inline-block relative">
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <SparkleInstance
            key={sparkle.id}
            color={sparkle.color}
            size={sparkle.size}
            style={sparkle.style}
          />
        ))}
      </AnimatePresence>
      <strong className="relative inline-block font-bold">{children}</strong>
    </span>
  )
}

