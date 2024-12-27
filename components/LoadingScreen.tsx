'use client'

import { motion } from 'framer-motion'

interface Step {
  label: string
  progress: number
}

interface LoadingScreenProps {
  steps: Step[]
  onComplete?: () => void
}

export function LoadingScreen({ steps, onComplete }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
    >
      <div className="w-full max-w-md space-y-8 p-8">
        {steps.map((step, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">{step.label}</span>
              <span className="text-[#CCFF00]">{step.progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${step.progress}%` }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="h-full rounded-full bg-[#CCFF00]"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

