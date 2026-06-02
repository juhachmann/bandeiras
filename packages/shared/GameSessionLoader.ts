import { IGameSession, GameConfig, IGameAdapter } from "./types/types"
import { GameSession } from "./core/GameSession"

export class GameSessionLoader {

    private constructor() {}

    static async createNew(gameAdapter : IGameAdapter, gameConfig: GameConfig) : Promise<IGameSession> {
        const session = new GameSession(gameAdapter, gameConfig)
        await session.initialize()
        return session
    }
    
}

