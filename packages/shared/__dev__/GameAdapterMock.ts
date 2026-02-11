import { IGameAdapter, IGeoItemRepository } from "@/types/types";
import { GeoItemRepositoryMock } from "./GeoItemRepositoryMock";


export class GameAdapterMock implements IGameAdapter {

    private geoItemRepository: IGeoItemRepository = new GeoItemRepositoryMock()
   
    getGeoItemRepository(): IGeoItemRepository {
        return this.geoItemRepository
    }
   
    
}