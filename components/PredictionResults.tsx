'use client'

import { motion } from 'framer-motion'
import { TEAMS } from '@/lib/constants'
import { Trophy, TrendingUp, Activity, Users } from 'lucide-react'
import type { PredictionResponse } from '@/types/api'

interface PredictionResultsProps {
  predictions: PredictionResponse[];
}

export default function PredictionResults({ predictions }: PredictionResultsProps) {
  if (!predictions || predictions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="text-center text-gray-400">Nincsenek elérhető predikciók.</div>
      </div>
    );
  }

  const getTeamName = (teamId: string) => TEAMS.find(team => team.id === teamId)?.name || teamId
  const getTeamLogo = (teamId: string) => {
    const logoUrl = TEAMS.find(team => team.id === teamId)?.logoUrl
    return logoUrl && logoUrl.length > 0 ? logoUrl : null
  }

  const formatPercentage = (value: number | undefined) => {
    if (value === undefined || isNaN(value)) return '0.0%'
    return `${(value * 100).toFixed(1)}%`
  }

  const formatScore = (value: number | undefined) => {
    if (value === undefined || isNaN(value)) return '0.00'
    return value.toFixed(2)
  }

  const formatRandomForest = (value: string) => {
    if (value === 'unknown_win') return 'Ismeretlen'
    return value
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#CCFF00]">Predikciók eredménye</h2>
      
      {predictions.map((predictionData, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="glass-effect rounded-2xl p-6"
        >
          {/* Match Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 relative">
                  {getTeamLogo(predictionData.team_analysis.home_team) && (
                    <img
                      src={getTeamLogo(predictionData.team_analysis.home_team) || ''}
                      alt={getTeamName(predictionData.team_analysis.home_team)}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <div className="text-3xl font-bold">vs</div>
                <div className="w-16 h-16 relative">
                  {getTeamLogo(predictionData.team_analysis.away_team) && (
                    <img
                      src={getTeamLogo(predictionData.team_analysis.away_team) || ''}
                      alt={getTeamName(predictionData.team_analysis.away_team)}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-[#CCFF00]" />
              <span className="text-xl font-bold">
                {formatPercentage(predictionData.prediction.confidence)}
              </span>
            </div>
          </div>

          {/* Prediction Details */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="bg-black/30 rounded-xl p-4">
                <h3 className="text-lg font-medium mb-4">Várható gólok</h3>
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {formatScore(predictionData.prediction.homeExpectedGoals)}
                    </div>
                    <div className="text-sm text-gray-400">Hazai</div>
                  </div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {formatScore(predictionData.prediction.awayExpectedGoals)}
                    </div>
                    <div className="text-sm text-gray-400">Vendég</div>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 rounded-xl p-4">
                <h3 className="text-lg font-medium mb-4">Forma index</h3>
                <div className="flex justify-between items-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {formatPercentage(predictionData.team_analysis.home_form_index / 100)}
                    </div>
                    <div className="text-sm text-gray-400">Hazai</div>
                  </div>
                  <div className="text-2xl font-bold">-</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {formatPercentage(predictionData.team_analysis.away_form_index / 100)}
                    </div>
                    <div className="text-sm text-gray-400">Vendég</div>
                  </div>
                </div>
              </div>

              <div className="bg-black/30 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-[#CCFF00]" />
                    <span>Mindkét csapat gól</span>
                  </div>
                  <span className="text-xl font-bold">
                    {formatPercentage(predictionData.prediction.bothTeamsToScoreProb)}
                  </span>
                </div>
              </div>
            </div>

            {/* Model Predictions */}
            <div className="bg-black/30 rounded-xl p-4">
              <h3 className="text-lg font-medium mb-4">Modell előrejelzések</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Random Forest</span>
                  <span className="font-bold">
                    {formatRandomForest(predictionData.prediction.modelPredictions.randomForest)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Poisson</span>
                  <span className="font-bold">
                    {predictionData.prediction.modelPredictions.poisson.homeGoals || 0} - {predictionData.prediction.modelPredictions.poisson.awayGoals || 0}
                  </span>
                </div>
                <div className="space-y-2">
                  <span>ELO</span>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="bg-[#CCFF00]/10 p-2 rounded-lg text-center">
                      <div className="font-bold">
                        {formatPercentage(predictionData.prediction.modelPredictions.elo.homeWinProb)}
                      </div>
                      <div className="text-xs text-gray-400">Hazai</div>
                    </div>
                    <div className="bg-[#CCFF00]/10 p-2 rounded-lg text-center">
                      <div className="font-bold">
                        {formatPercentage(predictionData.prediction.modelPredictions.elo.drawProb)}
                      </div>
                      <div className="text-xs text-gray-400">Döntetlen</div>
                    </div>
                    <div className="bg-[#CCFF00]/10 p-2 rounded-lg text-center">
                      <div className="font-bold">
                        {formatPercentage(predictionData.prediction.modelPredictions.elo.awayWinProb)}
                      </div>
                      <div className="text-xs text-gray-400">Vendég</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

