import { GeoItem } from "@/types/geoItem"

export const brazil : GeoItem[] = 
    [
        { 
            country: {id: 1, name: "Brasil"}, 
            flag: {country_id: 1, file: "/image/brazil.svg", description: "Verde e Amarelo", info: ""} 
        }
    ]

export const latinAmerica: GeoItem[]  = 
    [
        { 
            country: {id: 1, name: "Brasil"}, 
            flag: {country_id: 1, file: "/image/brazil.svg", description: "Verde e Amarelo", info: ""} 
        },
        { 
            country: {id: 2, name: "Venezuela"}, 
            flag: {country_id: 2, file: "/image/venezuela.svg", description: "Estrelinhas", info: ""} 
        },
        { 
            country: {id: 3, name: "Bolívia"}, 
            flag: {country_id: 3, file: "/image/bolivia.svg", description: "Amarela e Vermelha", info: ""} 
        }
    ]
