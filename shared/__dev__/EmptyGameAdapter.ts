import { EmptyRepositoryMock } from "./EmptyRepositoryMock";
import { IGameAdapter, IGeoItemRepository } from "../types/types";

export class EmptyGameAdapterMock implements IGameAdapter {

    private emptyRepoMock = new EmptyRepositoryMock()

    getGeoItemRepository(): IGeoItemRepository {
        return this.emptyRepoMock
    }
    
}