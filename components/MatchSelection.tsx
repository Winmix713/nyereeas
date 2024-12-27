'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { TEAMS } from '@/lib/constants'
import { useUser } from '@/contexts/UserContext'
import { LoadingScreen } from './LoadingScreen'
import { fetchPrediction } from '@/lib/api'
import type { PredictionResponse } from '@/types/api'

interface Match {
  homeTeam: string | null
  awayTeam: string | null
}

interface MatchSelectionProps {
  onPredictionsGenerated: (predictions: PredictionResponse[]) => void
  timeLeft: number
}

export default function MatchSelection({ onPredictionsGenerated, timeLeft }: MatchSelectionProps) {
  const [matches, setMatches] = useState<Match[]>(Array(8).fill({ homeTeam: null, awayTeam: null }))
  const [isGenerating, setIsGenerating] = useState(false)
  const [loadingSteps, setLoadingSteps] = useState<{ label: string; progress: number }[]>([
    { label: 'Adatok betöltése...', progress: 0 },
    { label: 'Predikciók számítása...', progress: 0 },
    { label: 'Eredmények feldolgozása...', progress: 0 },
  ])
  const { user } = useUser()

  const updateLoadingProgress = (stepIndex: number, progress: number) => {
    setLoadingSteps(steps => 
      steps.map((step, index) => 
        index === stepIndex ? { ...step, progress } : step
      )
    )
  }

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  const fetchWithRetry = async (match: Match, retries = 3): Promise<PredictionResponse> => {
    let lastError: Error | null = null
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        if (!match.homeTeam || !match.awayTeam) {
          throw new Error('Invalid team selection')
        }

        const result = await fetchPrediction(match.homeTeam, match.awayTeam)
        return result
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error occurred')
        console.error(`Retry attempt ${attempt}, Error:`, lastError.message, lastError.stack)
        
        if (attempt < retries) {
          const backoffTime = 1000 * Math.pow(2, attempt - 1) // Exponential backoff
          console.log(`Waiting for ${backoffTime}ms before retry`)
          await delay(backoffTime)
          continue
        }
      }
    }

    throw lastError || new Error('Failed to fetch prediction after multiple attempts')
  }

  const runPredictions = async () => {
    setIsGenerating(true)
    const validMatches = matches.filter(match => match.homeTeam && match.awayTeam)

    if (validMatches.length === 0) {
      alert('Kérjük, válasszon ki legalább egy teljes mérkőzést!')
      setIsGenerating(false)
      return
    }

    if (!navigator.onLine) {
      alert('Nincs internetkapcsolat. Kérjük, ellenőrizze a kapcsolatot és próbálja újra.')
      setIsGenerating(false)
      return
    }

    try {
      updateLoadingProgress(0, 100)

      const predictions = await Promise.all(
        validMatches.map(async (match, index) => {
          try {
            const result = await fetchWithRetry(match)
            updateLoadingProgress(1, Math.round((index + 1) / validMatches.length * 100))
            return result
          } catch (error) {
            console.error(`Error fetching prediction for match ${index + 1}:`, error)
            throw error
          }
        })
      )

      updateLoadingProgress(1, 100)
      
      const validPredictions = predictions.filter((p): p is NonNullable<typeof p> => p !== null)
      
      updateLoadingProgress(2, 100)
      
      await delay(500)
      
      onPredictionsGenerated(validPredictions)
    } catch (error) {
      console.error('Error generating predictions:', error)
      let errorMessage = 'Ismeretlen hiba történt a predikciók generálása során'
      
      if (error instanceof Error) {
        errorMessage = `Hiba történt: ${error.message}`
        console.error('Error stack:', error.stack)
      } else if (typeof error === 'object' && error !== null) {
        console.error('Error object:', JSON.stringify(error, null, 2))
      }
      
      alert(`${errorMessage}\n\nKérjük ellenőrizze az internetkapcsolatot és próbálja újra.`)
    } finally {
      setIsGenerating(false)
      setLoadingSteps(steps => steps.map(step => ({ ...step, progress: 0 })))
    }
  }

  const handleTeamSelect = (index: number, side: 'homeTeam' | 'awayTeam', teamId: string) => {
    const newMatches = [...matches]
    newMatches[index] = { ...newMatches[index], [side]: teamId }
    setMatches(newMatches)
  }

  const sortedTeams = [...TEAMS].sort((a, b) => a.name.localeCompare(b.name))

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 sm:space-y-6 mb-16 sm:mb-20"
      >
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {matches.map((match, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-3 sm:p-4 card-hover"
            >
              <div className="flex flex-col space-y-3 sm:space-y-4">
                <div className="relative flex-1">
                  <select
                    value={match.homeTeam || ''}
                    onChange={(e) => handleTeamSelect(index, 'homeTeam', e.target.value)}
                    className="w-full h-full px-3 py-2 sm:px-4 sm:py-3 bg-black/30 rounded-xl border border-white/10 focus:border-[#CCFF00]/50 focus:outline-none appearance-none cursor-pointer text-sm sm:text-base"
                  >
                    <option value="">Válassz hazai csapatot</option>
                    {sortedTeams.map(team => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CCFF00] h-4 w-4" />
                </div>

                <div className="flex items-center justify-center">
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/20 to-transparent" />
                  <span className="mx-3 text-xs sm:text-sm text-gray-400">VS</span>
                  <div className="w-8 h-px bg-gradient-to-r from-transparent via-[#CCFF00]/20 to-transparent" />
                </div>

                <div className="relative flex-1">
                  <select
                    value={match.awayTeam || ''}
                    onChange={(e) => handleTeamSelect(index, 'awayTeam', e.target.value)}
                    className="w-full h-full px-3 py-2 sm:px-4 sm:py-3 bg-black/30 rounded-xl border border-white/10 focus:border-[#CCFF00]/50 focus:outline-none appearance-none cursor-pointer text-sm sm:text-base"
                  >
                    <option value="">Válassz vendég csapatot</option>
                    {sortedTeams.map(team => (
                      <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#CCFF00] h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={runPredictions}
          disabled={!user || !matches.some(match => match.homeTeam && match.awayTeam) || timeLeft <= 0 || isGenerating}
          className={`
            w-full mt-4 sm:mt-8 py-3 sm:py-4 rounded-xl font-medium transition-all text-sm sm:text-base
            ${!user || isGenerating ? 
              'bg-gray-800 text-gray-400 cursor-not-allowed' : 
              'bg-gradient-to-r from-[#CCFF00] to-[#9EFF00] text-black hover:opacity-90'
            }
          `}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-gray-400 border-t-transparent" />
              <span>Predikciók generálása...</span>
            </div>
          ) : (
            'Predikciók futtatása'
          )}
        </motion.button>
      </motion.div>
      {isGenerating && (
        <LoadingScreen steps={loadingSteps} />
      )}
    </>
  )
}

