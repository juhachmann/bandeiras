import { GameType, GeoItem, GeoLocation, IGameSession, IGeoItemRepository } from "@/types/types";

export class EmptyRepositoryMock implements IGeoItemRepository {

    async save(session: IGameSession): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getHistory(userId: string): Promise<IGameSession[]> {
       return []
    }

    async getByGameType(userId: string, gameType: GameType): Promise<IGameSession[]> {
        return []
    }
    
    async getByGeoLocation(location: GeoLocation): Promise<GeoItem[]> {
        return []
    }
    
}