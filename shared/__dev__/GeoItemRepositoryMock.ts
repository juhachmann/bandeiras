import { brazil, latinAmerica } from "@/__dev__/data/geoItems"
import { GeoItemRepository } from "@/types/repositories"
import { GeoItem } from "@/types/GeoItem"
import { GeoLocation } from "@/types/GameConfig"


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






