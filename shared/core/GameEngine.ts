import { GameSessionRepository, GeoItemRepository } from "@/types/repository";
import { Difficulty, GameConfig, GameType, GeoLocation } from "@/types/gameConfig";
import { GameSession } from "@/types/gameSession";
import { GameTimer } from "../types/GameTimer";
import { GeoItem, Question } from "../types";
import { FlagQuestionFactory, QuestionFactory } from "./QuestionFactoy";

export class GameEngine {

  private constructor(
    private geoitemRepository: GeoItemRepository,
    private sessionRepository: GameSessionRepository,
    private timer: GameTimer,
    private session: GameSession,
    private questionFactory : QuestionFactory
  ) { }

  static fromConfig(
    repository: GeoItemRepository,
    sessionRepository: GameSessionRepository,
    timer: GameTimer,
    config: GameConfig
  ) : GameEngine {
    const session : GameSession = {
      config: config,
      score: 0,
      totalQuestions: 0,
      questions: [],
      gameTimeMiliseconds: 0
    }
    const questionFactory : QuestionFactory = QuestionFactory.create(session.config)
    return new GameEngine(repository, sessionRepository, timer, session, questionFactory)
  }

  static fromSession(
    repository: GeoItemRepository,
    sessionRepository: GameSessionRepository,
    timer: GameTimer,
    session: GameSession
  ) : GameEngine {
    const questionFactory : QuestionFactory = QuestionFactory.create(session.config)
    return new GameEngine(repository, sessionRepository, timer, session, questionFactory) 
  }

  async initialize(): Promise<void> {
      if (this.session.questions.length == 0) {
          await this.setSessionQuestions()
      }
  }  

  private async setSessionQuestions(): Promise<void> {
    const geoItems = await this.geoitemRepository.getByGeoLocation(this.session.config.location)
    const questions = this.questionFactory.createQuestions(geoItems)
    this.session.questions = questions
    this.session.totalQuestions = questions.length
  }



  startGame(): void {

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

  getSession(): GameSession { 
    return this.session
  }

}