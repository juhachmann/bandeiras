import { IFlagItemRepository, IGameAdapter } from "@/types/types";
import { FlagItemRepositoryMock } from "./GeoItemRepositoryMock";


export class GameAdapterMock implements IGameAdapter {

    private flagItemRepository: IFlagItemRepository = new FlagItemRepositoryMock()
   
 
    getFlagItemRepository(): IFlagItemRepository {
        return this.flagItemRepository
    }
   
    
}