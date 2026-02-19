import { FlagItem, GeoItem, GeoLocation, IFlagItemRepository, IGeoItemRepository, QuerySpec } from "@/types/types";

export class EmptyRepositoryMock implements IFlagItemRepository {
    
    async findBySpec(spec: QuerySpec[]): Promise<FlagItem[]> {
        return []
    }
   
    
}