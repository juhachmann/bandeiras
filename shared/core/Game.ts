import { GameSession } from "@/types/gameSession";
import { Difficulty, GameConfig, GameType, GeoLocation } from "@/types/gameConfig";
import { GameAdapter } from "@/core/GameAdapter";
import { GameEngine } from "./GameEngine";
import { Answer, Question } from "./Question";

export class Game {

    private gameEngine : GameEngine

    private constructor (
        gameConfig: GameConfig, 
        adpater: GameAdapter
    ) { 
        const itemRepo = adpater.getGeoItemRepository()
        const sessionRepo = adpater.getSessionRepository()
        const timer = adpater.getTimer()
        this.gameEngine = GameEngine.fromConfig(itemRepo, sessionRepo, timer, gameConfig)
    }

    static async createGame(gameConfig: GameConfig, gameAdapter: GameAdapter): Promise<Game> {
        const game = new Game(gameConfig, gameAdapter);
        await game.gameEngine.initialize();
        return game;
    }

    static async loadGame(sessionId: string, gameAdapter: GameAdapter): Promise<Game | undefined> {
        // Retrieve config from repository, se não encontrar, não retorna nada? Retorna um Optional? 
        const gameConfig : GameConfig = {
            gameType: GameType.FLAGS,
            location: GeoLocation.BRAZIL,
            difficulty: Difficulty.EASY
        }
        // Aqui vai fazer o Game Engine from Session!!
        return new Game(gameConfig, gameAdapter);
    }

    start() : void {

    }

    async save(): Promise<void> {
        // Salva GameSession e GameProgress ... 
        // ... se GameProgress estiver como não iniciado ou terminado, não precisa salvar as questões
    }

    async end(): Promise<void> {
    
    }

    pause() {

    }

    resume() {

    }

    validateAnswer(question: Question, answer: Answer): boolean { 
        return this.gameEngine.submitAnswer(question, answer)
    }
    
    isGameOver(): boolean { 
        return this.gameEngine.isGameOver()
    }

    getQuestions(): Question[] {
        const session = this.gameEngine.getSession()        
        return this.gameEngine.getSession().questions
    }

    nextQuestion() : Question | null {
        return this.gameEngine.nextQuestion()
    }

    getCurrentQuestion(): Question | null {
        return null
    }


}