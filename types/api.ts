export interface PredictionResponse {
  prediction: {
    homeExpectedGoals: number;
    awayExpectedGoals: number;
    bothTeamsToScoreProb: number;
    predictedWinner: 'home' | 'away' | 'draw';
    confidence: number;
    modelPredictions: {
      randomForest: string;
      poisson: {
        homeGoals: number;
        awayGoals: number;
      };
      elo: {
        homeWinProb: number;
        drawProb: number;
        awayWinProb: number;
      };
    };
  };
  team_analysis: {
    home_team: string;
    away_team: string;
    matches_count: number;
    both_teams_scored_percentage: number;
    average_goals: {
      average_total_goals: number;
      average_home_goals: number;
      average_away_goals: number;
    };
    home_form_index: number;
    away_form_index: number;
    head_to_head_stats: {
      home_wins: number;
      away_wins: number;
      draws: number;
      home_win_percentage: number;
      away_win_percentage: number;
      draw_percentage: number;
    };
  };
}

