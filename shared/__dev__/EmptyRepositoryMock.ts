import { GameSession, GameSessionRepository, GameType, GeoItem, GeoItemRepository, GeoLocation } from "../types";

export class EmptyRepositoryMock implements GeoItemRepository, GameSessionRepository {

    async save(session: GameSession): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getHistory(userId: string): Promise<GameSession[]> {
       return []
    }

    async getByGameType(userId: string, gameType: GameType): Promise<GameSession[]> {
        return []
    }
    
    async getByGeoLocation(location: GeoLocation): Promise<GeoItem[]> {
        return []
    }
    
}