import { GameSessionRepository, GeoItemRepository } from "@/repository/repositories";
import { Difficulty, GameConfig, GameType, GeoLocation } from "@/types/gameConfig";
import { GameProgress, GameSession } from "@/types/gameSession";
import { Question } from '@/types/questions';
import { ScoreCalculator } from "@/core/ScoreCalculator";
import { GameTimer } from "./GameTimer";

export class GameEngine {

  // private scoreCalculator : ScoreCalculator
  // private 

  constructor(
    repository: GeoItemRepository,
    sessionRepository: GameSessionRepository,
    timer: GameTimer,
    config: GameConfig,
  ) 

  constructor(
    repository: GeoItemRepository,
    sessionRepository: GameSessionRepository,
    timer: GameTimer,
    session: GameSession
  ) 

  constructor(
    private repository: GeoItemRepository,
    private sessionRepository: GameSessionRepository,
    private timer: GameTimer,
    configOrSession: GameConfig | GameSession,
  ) {
    this.initialize()
  }
  
  // Lifecycle
  private async initialize(): Promise<void> {
    // Cria a sessão, o progress, as questions, o timer e o score, inicializa o score calculator e o questionFactory
  }

  async startGame(): Promise<void> {

  }

  async endGame(): Promise<GameSession | null> { 
    return null 
  }
  
  submitAnswer(selectedId: string): boolean { 
    return false 
  }
  
  isGameOver(): boolean { 
    return false 
  }

  getSession(): GameSession | null { 
    return null
  }

}