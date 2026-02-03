import { GeoLocation } from "@/types/types"
import { GeoItem } from "@/types/types"

export const brazil : GeoItem[] = 
    [
        { 
            country: {id: 1, name: "Brasil"}, 
            flag: {country_id: 1, file: "/image/brazil.svg", description: "Verde e Amarelo", info: ""},
            geoLocation: GeoLocation.BRAZIL 
        }
    ]

export const latinAmerica: GeoItem[]  = 
    [
        { 
            country: {id: 1, name: "Brasil"}, 
            flag: {country_id: 1, file: "/image/brazil.svg", description: "Verde e Amarelo", info: ""},
            geoLocation: GeoLocation.LATIN_AMERICA 
        },
        { 
            country: {id: 2, name: "Venezuela"}, 
            flag: {country_id: 2, file: "/image/venezuela.svg", description: "Estrelinhas", info: ""},
            geoLocation: GeoLocation.LATIN_AMERICA 
        },
        { 
            country: {id: 3, name: "Bolívia"}, 
            flag: {country_id: 3, file: "/image/bolivia.svg", description: "Amarela e Vermelha", info: ""},
            geoLocation: GeoLocation.LATIN_AMERICA 
        }
    ]
