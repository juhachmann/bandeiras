import { GeoItem, GeoLocation, IGeoItemRepository } from "@flags/game";
import { brazil, latinAmerica } from "@flags/test-data";

export class GeoItemLocalService implements IGeoItemRepository {
    
    async getByGeoLocation(location: GeoLocation): Promise<GeoItem[]> {
                
        if (location === GeoLocation.BRAZIL) {
            return mapToGeoItem(brazil)
        }
        if (location === GeoLocation.LATIN_AMERICA) {
            return mapToGeoItem(latinAmerica)
        }
        throw new Error('GeoLocation não disponível')
    }
    
}


const mapToGeoItem = (data: any[]) : GeoItem[] => {
    return data.map(d => {
        const a : GeoItem = {
            country: {
                id: d.country.id,
                name: d.country.name
            },
            flag: {
                country_id: d.flag.country_id,
                file: d.flag.file,
                description: d.flag.description,
                info: d.flag.info
            },
            geoLocation: GeoLocation.get(d.geoLocation)!
        }
        return a
    })
}

