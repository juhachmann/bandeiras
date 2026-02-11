import fs from 'node:fs';

const data = [
    'Mexico',
    'Guatemala',
    'Honduras',
    'Belize',
    'Costa Rica',
    'San Salvador',
    'Nicarágua',
    'Panama',
    'Jamaica',
    'Cuba',
    'Haiti',
    'República Dominicana',
    'Colômbia',
    'Venezuela',
    'Suriname',
    'Guiana',
    'Equador',
    'Peru',
    'Bolívia',
    'Chile',
    'Paraguai',
    'Uruguai',
    'Brasil',
    'Argentina'
]

const resultList = []

const generate = (nome, counter) => {
    const nomeTratado = tirarEspacos(nome).toLowerCase()
    const nomeFinalizado = tirarAcentos(nomeTratado)
    return { 
        country: {id: counter, name: nome}, 
        flag: {country_id: counter, file: nomeFinalizado + ".svg", description: "", info: ""},
        geoLocation: 'latin_america'
    }
}

const tirarEspacos = (nome) => {
    return nome.replace(/\s/g, '_')
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
    const result = generate(d, counter)
    console.log(result);
    resultList.push(result) 
})

console.log(resultList);

const resultJson = JSON.stringify(resultList)

console.log(resultJson);


writeToFile('const data = ', 'data.ts')

writeToFile(resultJson, 'data.ts')
