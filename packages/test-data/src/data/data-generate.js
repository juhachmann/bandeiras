import fs from 'node:fs';

import {iso31661} from 'iso-3166'

const data = [
    'Mexico',
    'Guatemala',
    'Honduras',
    'Belize',
    'Costa Rica',
    'EL Salvador',
    'Nicaragua',
    'Panama',
    'Jamaica',
    'Cuba',
    'Haiti',
    'Dominican Republic',
    'Colombia',
    'Venezuela',
    'Suriname',
    'French Guiana',
    'Ecuador',
    'Peru',
    'Bolivia',
    'Chile',
    'Paraguay',
    'Uruguay',
    'Brazil',
    'Argentina'
]

const resultListWithIso = []
const resultListWithoutIso = []

const generate = (nome, counter) => {
    const nomeTratado = tirarEspacos(nome).toLowerCase()
    const nomeFinalizado = tirarAcentos(nomeTratado)
    const iso = toIso31661(nome)
    return { 
        country: {id: counter, name: nome, iso31661: iso}, 
        flag: {country_id: counter, file: nomeFinalizado + ".svg", description: "", info: ""},
        geoLocation: 'latin_america'
    }
}

const generateFlagItem = (nome, id) => {
    const nomeTratado = tirarEspacos(nome).toLowerCase()
    const nomeFinalizado = tirarAcentos(nomeTratado)
    const iso = toIso31661(nome)
    return { 
        subject: {id: id, name: nome, code: iso, codeType: 'iso31661'}, 
        flag: {subjectId: id, file: nomeFinalizado + ".svg", description: "", info: ""},
        metadata: {type: 'country', period: 'modern', region: 'latin_america'}
    }
}

const tirarEspacos = (nome) => {
    return nome.replace(/\s/g, '_')
}

const toIso31661 = (pais) => {
    console.log("Procurando iso de: " + pais);    
    return iso31661.find(iso => iso.name.toLowerCase() == pais.toLowerCase())?.alpha2
}

const tirarAcentos = (texto) => {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const writeToFile = (conteudo, nomeArquivo) => {
    fs.appendFileSync(nomeArquivo, conteudo)
}

let counter = 0

data.forEach(d => {
    counter++
    // const result = generate(d, counter)
    const result = generateFlagItem(d, counter)
    console.log(result);
    // if (result.country.iso31661)
    if (result.subject.code)
        resultListWithIso.push(result) 
    else 
        resultListWithoutIso.push(result) 

})


console.log(resultListWithIso);
console.log(resultListWithoutIso);


const resultJsonWithIso = JSON.stringify(resultListWithIso)
const resultJsonWithoutIso = JSON.stringify(resultListWithoutIso)


writeToFile('const data = ', 'data.ts')

writeToFile(resultJsonWithIso, 'data.ts')

writeToFile('\n const dataWithoutISO = ', 'data.ts')

writeToFile(resultJsonWithoutIso, 'data.ts')

