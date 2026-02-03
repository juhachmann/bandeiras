import { GeoItem, GeoLocation, IGeoItemRepository } from "../types/types"
import { brazil, latinAmerica } from "./data/geoItems"


export class GeoItemRepositoryMock implements IGeoItemRepository {
    
    async getByGeoLocation(geoLocation: GeoLocation): Promise<GeoItem[]> {
        
        if (geoLocation === GeoLocation.BRAZIL) {
            return brazil
        }
        
        if (geoLocation === GeoLocation.LATIN_AMERICA) {
            return latinAmerica
        }
        
        return []

    }
}






