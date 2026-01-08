import { GameSession } from "@/types/gameSession";
import { Difficulty, GameConfig, GameType, GeoLocation } from "@/types/gameConfig";
import { GameAdapter } from "@/core/GameAdapter";
import { GameEngine } from "./GameEngine";
import { Question } from "@/types";

export class Game {

    private gameEngine : GameEngine

    private constructor (
        private gameConfig: GameConfig, 
        private adpater: GameAdapter
    ) { 
        const itemRepo = this.adpater.getGeoItemRepository()
        const sessionRepo = this.adpater.getSessionRepository()
        const timer = this.adpater.getTimer()
        this.gameEngine = GameEngine.fromConfig(itemRepo, sessionRepo, timer, gameConfig)
    }

    static async createGame(gameConfig: GameConfig, gameAdapter: GameAdapter): Promise<Game> {
        const game = new Game(gameConfig, gameAdapter);
        await game.gameEngine.initialize();  // Esperar inicialização
        return game;
    }

    static async loadGame(sessionId: string, gameAdapter: GameAdapter): Promise<Game | undefined> {
        // Retrieve config from repository, se não encontrar, não retorna nada? Retorna um Optional? 
        const gameConfig : GameConfig = {
            gameType: GameType.FLAGS,
            location: GeoLocation.BRAZIL,
            difficulty: Difficulty.EASY
        }
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

    submitAnswer(selectedId: string): boolean { 
        return this.gameEngine.submitAnswer(selectedId)
    }
    
    isGameOver(): boolean { 
        return this.gameEngine.isGameOver()
    }

    getQuestions(): Question[] {
        const session = this.gameEngine.getSession()        
        return this.gameEngine.getSession().questions
    }

    getQuestionOrder(): number[] {
        return []
    }

    getCurrentQuestion(): Question | null {
        return null
    }


}