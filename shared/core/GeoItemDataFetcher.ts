import { GeoItemRepository } from "@/types/repositories"
import { GeoLocation } from "@/types/GameConfig"
import { GeoItem } from "@/types/GeoItem"

// Esta classe wrapper vai servir apenas para lógica de retry e cache, mas não é pra estar aqui...
export class GeoItemDataFetcher {

    private geoItemRepository : GeoItemRepository

    constructor(geoItemRepository: GeoItemRepository) {
        this.geoItemRepository = geoItemRepository
    }

    async getByGeoLocation(geolocation: GeoLocation) : Promise<GeoItem[]> {
        return this.geoItemRepository.getByGeoLocation(geolocation)
    }

}