import { GeoItem, GeoLocation, IGeoItemRepository } from "@/types/types";

export class EmptyRepositoryMock implements IGeoItemRepository {
   
    async getByGeoLocation(location: GeoLocation): Promise<GeoItem[]> {
        return []
    }
    
}