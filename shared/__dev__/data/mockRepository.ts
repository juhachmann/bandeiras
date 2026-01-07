import { brazilData, latinAmericaData } from "@/__dev__/data/mockData"
import { GameSessionRepository, GeoItemRepository } from "@/repository/repositories"
import { GameType, GeoLocation } from "@/types/gameConfig"
import { GameSession } from "@/types/gameSession"
import { GeoItem } from "@/types/geoItems"


export class geoItemMockRepository implements GeoItemRepository {
    
    async getByGeoLocation(geoLocation: GeoLocation): Promise<GeoItem[]> {
        
        if (geoLocation === GeoLocation.BRAZIL) {
            return brazilData
        }
        
        if (geoLocation === GeoLocation.LATIN_AMERICA) {
            return latinAmericaData
        }
        
        return []

    }
}


export class gameSessionMockRepository implements GameSessionRepository {
    
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

