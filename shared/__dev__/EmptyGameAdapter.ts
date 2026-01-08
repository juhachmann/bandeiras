import { GameAdapter } from "@/core";
import { GameTimer } from "@/types/GameTimer";
import { GeoItemRepository, GameSessionRepository } from "@/types";
import { GameTimerMock } from "@/__dev__/GameTimerMock";
import { EmptyRepositoryMock } from "./EmptyRepositoryMock";

export class EmptyGameAdapterMock implements GameAdapter {

    private emptyRepoMock = new EmptyRepositoryMock()

    private gameTimer: GameTimer = new GameTimerMock()

    getGeoItemRepository(): GeoItemRepository {
        return this.emptyRepoMock
    }
    getSessionRepository(): GameSessionRepository {
        return this.emptyRepoMock
    }
    getTimer(): GameTimer {
        return this.gameTimer
    }
    
}