import { GeoItem } from "../types";

export const latinAmericaData : Array<GeoItem> = 
    [
        { 
            country: {id: 1, name: "Brasil"}, 
            flag: {country_id: 1, file: "/flags/brazil.svg", description: "Verde e Amarelo", info: ""} 
        },
        { 
            country: {id: 2, name: "Venezuela"}, 
            flag: {country_id: 2, file: "/flags/venezuela.svg", description: "Estrelinhas", info: ""} 
        },
        { 
            country: {id: 3, name: "Bolívia"}, 
            flag: {country_id: 3, file: "/flags/bolivia.svg", description: "Amarela e Vermelha", info: ""} 
        }
    ]