import { Question } from '@/core/Question';
import { GameConfig } from '@/types/gameConfig'

export interface GameSession {
  session_id?: string;
  userId?: string;
  config: GameConfig;
  startTime?: Date;
  endTime?: Date;
  score: number;
  totalQuestions: number;
  questions: Question[];
  gameTimeMiliseconds: number; 
}

export interface GameState {
  status: GameStatus;
  score: number;
  progress: GameProgress;
}

export enum GameStatus {
  NOT_STARTED = 'not_started',
  PLAYING = 'playing',
  PAUSED = 'paused',
  FINISHED = 'finished'
}

export interface GameProgress {
  currentQuestionIndex: number;
  totalQuestions: number;
  percentage: number;
}
