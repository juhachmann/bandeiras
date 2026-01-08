import { GameType, GeoLocation } from "@/types/gameConfig"
import { GameSession } from "@/types/gameSession"
import { GeoItem } from "@/types/geoItem"

export interface GeoItemRepository {
  getByGeoLocation(location: GeoLocation): Promise<GeoItem[]>
}

export interface GameSessionRepository {
  save(session: GameSession): Promise<void>
  getHistory(userId: string): Promise<GameSession[]>
  getByGameType(userId: string, gameType: GameType): Promise<GameSession[]>
}
