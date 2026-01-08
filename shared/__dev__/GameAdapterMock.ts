import { GameAdapter } from "@/core";
import { GameTimer } from "@/types/GameTimer";
import { GeoItemRepository, GameSessionRepository } from "@/types";
import { geoItemRepositoryMock } from "@/__dev__/GeoItemRepositoryMock";
import { GameSessionRepositoryMock } from "@/__dev__/GameSessionRepositoryMock";
import { GameTimerMock } from "@/__dev__/GameTimerMock";

export class GameAdapterMock implements GameAdapter {

    private geoItemRepository: GeoItemRepository = new geoItemRepositoryMock()
    private gameSessionRepository: GameSessionRepository = new GameSessionRepositoryMock()
    private gameTimer: GameTimer = new GameTimerMock()

    getGeoItemRepository(): GeoItemRepository {
        return this.geoItemRepository
    }
    getSessionRepository(): GameSessionRepository {
        return this.gameSessionRepository
    }
    getTimer(): GameTimer {
        return this.gameTimer
    }
    
}