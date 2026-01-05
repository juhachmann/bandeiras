import { GeoItem, GeoItemService } from "../types"
import { latinAmericaData } from "../data/latin_america"
import { brazilData } from "../data/brazil";

export class GeoItemDataSource implements GeoItemService {

    getLatinAmericaFlags() : Array<GeoItem> {
        return latinAmericaData;
    }

    getBrazilFlags() : Array<GeoItem> {
        return brazilData;
    }
    
}

