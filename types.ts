
export interface AnalysisResult {
  level: number;
  nickname: string;
  description: string;
  advice: string;
  careRoutine: string;
  skinAge: number; // 재미 요소를 위한 피부 나이 추정
  similarityEmoji: string; // 단계를 상징하는 재미있는 이모지
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
