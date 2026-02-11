import { EmptyRepositoryMock } from "./EmptyRepositoryMock";
import { IGameAdapter, IGeoItemRepository } from "@flags/game/types/types";

export class EmptyGameAdapterMock implements IGameAdapter {

    private readonly emptyRepoMock = new EmptyRepositoryMock()

    getGeoItemRepository(): IGeoItemRepository {
        return this.emptyRepoMock
    }
    
}