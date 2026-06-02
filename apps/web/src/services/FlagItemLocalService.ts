import { FlagItem, IFlagItemRepository, QuerySpec } from "@flags/game";
import { latin_america_flag } from "@flags/test-data";

export class FlagItemLocalService implements IFlagItemRepository {

    async findBySpec(spec: QuerySpec[]): Promise<FlagItem[]> {
        let results = latin_america_flag as FlagItem[];

        for (const query of spec) {
            results = results.filter(item => {
                const value = (item as any)[query.field] ?? (item.metadata as any)[query.field];
                if (query.operator === 'eq') return value === query.value;
                if (query.operator === 'in') return (query.value as any[]).includes(value);
                if (query.operator === 'contains') return String(value).includes(String(query.value));
                return true;
            });
        }

        return results;
    }
}
