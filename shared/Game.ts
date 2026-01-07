import { Question } from "@/types/questions";
import { GameProgress, GameSession } from "@/types/gameSession";
import { Difficulty, GameConfig, GameType, GeoLocation } from "@/types/gameConfig";
import { GameAdapter } from "@/GameAdapter";
import { GameEngine } from "./core/GameEngine";

export class Game {

    private gameEngine : GameEngine

    private constructor (
        private gameConfig: GameConfig, 
        private adpater: GameAdapter
    ) { 
        const itemRepo = this.adpater.getGeoItemRepository()
        const sessionRepo = this.adpater.getSessionRepository()
        const timer = this.adpater.getTimer()
        this.gameEngine = new GameEngine(itemRepo, sessionRepo, timer, this.gameConfig)
    }

    static async createGame(gameConfig: GameConfig, gameAdapter: GameAdapter): Promise<Game> {
        return new Game(gameConfig, gameAdapter);
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

    async saveGame(): Promise<void> {
        // Salva GameSession e GameProgress ... 
        // ... se GameProgress estiver como não iniciado ou terminado, não precisa salvar as questões
    }

    async endGame(): Promise<void> {
    
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

    getSession(): GameSession { 
        return this.gameEngine.getSession()
    }

}