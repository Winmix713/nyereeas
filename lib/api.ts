import { TEAMS } from './constants'
import type { PredictionResponse } from '@/types/api'

const API_URL = 'https://winmix.hu/api/2/fullapi.php'
const TIMEOUT_DURATION = 10000 // 10 seconds

export async function fetchPrediction(homeTeam: string, awayTeam: string): Promise<PredictionResponse> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION)

  try {
    const params = new URLSearchParams({
      home_team: homeTeam,
      away_team: awayTeam
    })

    console.log(`Fetching prediction for ${homeTeam} vs ${awayTeam}`)
    const response = await fetch(`${API_URL}?${params}`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`HTTP error! status: ${response.status}, message: ${errorText}`)
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const data = await response.json()
    console.log(`Received data for ${homeTeam} vs ${awayTeam}:`, JSON.stringify(data, null, 2))

    // Validate response structure
    if (!data || !data.prediction || !data.team_analysis) {
      console.error('Invalid API response format:', JSON.stringify(data, null, 2))
      throw new Error('Invalid API response format: Missing required fields')
    }

    return data
  } catch (error) {
    console.error('Error in fetchPrediction:', error)
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timeout: The prediction service is not responding')
      }
      throw new Error(`Prediction API error: ${error.message}`)
    }
    throw new Error('An unexpected error occurred while fetching prediction')
  } finally {
    clearTimeout(timeoutId)
  }
}

export function getTeamName(teamId: string): string {
  return TEAMS.find(team => team.id === teamId)?.name || teamId
}

export function getTeamLogo(teamId: string): string {
  return TEAMS.find(team => team.id === teamId)?.logoUrl || ''
}

