import { brazil, latinAmerica } from "@/__dev__/data/geoItems"
import { GeoItemRepository } from "@/types/repository"
import { GeoItem } from "@/types/geoItem"
import { GeoLocation } from "@/types/gameConfig"


export class geoItemRepositoryMock implements GeoItemRepository {
    
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






