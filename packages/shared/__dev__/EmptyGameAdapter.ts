import { EmptyRepositoryMock } from "./EmptyRepositoryMock";
import { IFlagItemRepository, IGameAdapter, IGeoItemRepository } from "@flags/game/types/types";

export class EmptyGameAdapterMock implements IGameAdapter {

    private readonly emptyRepoMock = new EmptyRepositoryMock()

    getFlagItemRepository(): IFlagItemRepository {
        return this.emptyRepoMock
    }
    
}