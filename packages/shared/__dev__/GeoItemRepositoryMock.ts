import { GeoItem, GeoLocation, IGeoItemRepository } from "@/types/types"
import { brazil, latinAmerica } from "@flags/test-data"


export class GeoItemRepositoryMock implements IGeoItemRepository {
    
    async getByGeoLocation(geoLocation: GeoLocation): Promise<GeoItem[]> {
        
        if (geoLocation === GeoLocation.BRAZIL) {
            return mapToGeoItem(brazil)
        }
        if (geoLocation === GeoLocation.LATIN_AMERICA) {
            return mapToGeoItem(latinAmerica)
        }
        
        return []

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

