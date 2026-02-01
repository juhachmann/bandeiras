import { GameSessionRepository } from "@/types/repositories"
import { GameSession } from "@/types/gameSession"
import { GameType } from "@/types"

export class GameSessionRepositoryMock implements GameSessionRepository {
    
    save(session: GameSession): Promise<void> {
        throw new Error("Method not implemented.")
    }
    
    getHistory(userId: string): Promise<GameSession[]> {
        throw new Error("Method not implemented.")
    }
    
    getByGameType(userId: string, gameType: GameType): Promise<GameSession[]> {
        throw new Error("Method not implemented.")
    }
    
}
