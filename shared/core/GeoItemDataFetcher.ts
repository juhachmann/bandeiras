import { GeoItemRepository } from "@/repository/repositories"
import { GeoLocation } from "@/types/gameConfig"
import { GeoItem } from "@/types/geoItems"

// Esta classe wrapper vai servir para lógica de retry e cache
export class GeoItemDataFetcher {

    private geoItemRepository : GeoItemRepository

    constructor(geoItemRepository: GeoItemRepository) {
        this.geoItemRepository = geoItemRepository
    }

    async getByGeoLocation(geolocation: GeoLocation) : Promise<GeoItem[]> {
        return this.geoItemRepository.getByGeoLocation(geolocation)
    }

}