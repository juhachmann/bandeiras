import { FlagItem, GeoItem, GeoLocation, IFlagItemRepository, IGeoItemRepository, QuerySpec } from "@/types/types"
import { brazil, latin_america_flag, latinAmerica } from "@flags/test-data"

export class FlagItemRepositoryMock implements IFlagItemRepository {
    
    async findBySpec(spec: QuerySpec[]): Promise<FlagItem[]> {
        return mapToFlagItem(latin_america_flag )
    }

}

const mapToFlagItem = (data: any[]) : FlagItem[] => {
    return data.map(record => {
        return {
            subject : {
                id: record.id,
                code: record.code ?? "",
                codeType: record.codeType ?? "",
                name: record.name,
                type: record.type ?? ""
            },
            flag: {
                subjectId: record.subjectId,
                file: record.flag.file,
                description: record.flag.description,
                info: record.flag.info,
            },
            metadata: record.metadata
        }
    })
}

