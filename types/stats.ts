export interface PredictionStats {
  successRate: {
    value: number
    change: number
  }
  activeUsers: {
    value: number
    change: number
  }
  dailyPredictions: {
    value: number
    change: number
  }
  averageProfit: {
    value: number
    change: number
  }
}

export interface WeeklyAccuracy {
  data: number[]
  labels: string[]
}

