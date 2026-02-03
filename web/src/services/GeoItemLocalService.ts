import { GeoItem, GeoLocation, IGeoItemRepository } from "@flags/game";
import { brazil, latinAmerica } from "./data/geoItems";

export class GeoItemLocalService implements IGeoItemRepository {
    
    async getByGeoLocation(location: GeoLocation): Promise<GeoItem[]> {
        
        if (location == GeoLocation.LATIN_AMERICA) {
            return latinAmerica
        }
        if (location == GeoLocation.BRAZIL) {
            return brazil
        }
        throw new Error('GeoLocation não disponível')
    }
    
}