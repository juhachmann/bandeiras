import { GeoItem } from "../types"

export const getFlags = () : Array<GeoItem> =>  {

    return [
        { 
            country: {id: 1, name: "Brasil"}, 
            flag: {country_id: 1, file: "/flags/Flag_of_Brazil.svg", description: "Verde e Amarelo", info: ""} 
        },
        { 
            country: {id: 2, name: "Venezuela"}, 
            flag: {country_id: 2, file: "/flags/Flag_of_Venezuela.svg", description: "Estrelinhas", info: ""} 
        },
        { 
            country: {id: 3, name: "Bolívia"}, 
            flag: {country_id: 3, file: "/flags/Flag_of_Bolivia_(state).svg", description: "Amarela e Vermelha", info: ""} 
        }
    ]
   
}