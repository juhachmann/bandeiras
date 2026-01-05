import { Country, Flag, TriviaProps, GeoItem, GeoItemService } from '../types/index';
import { shuffleArray } from '../utils';
import { GeoLocation } from './GeoLocation';

export class Trivia {

    private countries: Array<Country>
    private flags: Array<Flag>

    private geoItemService : GeoItemService
    
    constructor(triviaProps: TriviaProps) {
        this.geoItemService = triviaProps.geoItemService
        const data : Array<GeoItem> = this.getData(triviaProps)
        this.setCountries(data)
        this.setFlags(data)
    }

    private getData(triviaProps: TriviaProps) : Array<GeoItem> {
        if (triviaProps.location === GeoLocation.BRAZIL) {
            return this.geoItemService.getBrazilFlags()
        }
        if (triviaProps.location === GeoLocation.LATIN_AMERICA) {
            return this.geoItemService.getLatinAmericaFlags()
        }
        return null
    }

    private setCountries(data: Array<GeoItem>) : void {
        const shuffledGeoItems : Array<GeoItem> = shuffleArray(data)
        this.countries = shuffledGeoItems.map((geoItem) => geoItem.country)
    }

    private setFlags(data: Array<GeoItem>) : void {
        const shuffledGeoItems : Array<GeoItem> = shuffleArray(data)
        this.flags = shuffledGeoItems.map((geoItem) => geoItem.flag)
    }

    getCountries() : Array<Country> {
        return this.countries
    }

    getFlags() : Array<Flag> {
        return this.flags
    }

    doesMatch(country: Country, flag: Flag) : boolean {
        return country.id === flag.country_id
    }

}
