
export interface Question {
    id: string,
    answer: Answer,
    text: string,
    hint?: Text,
    image?: string,
    geolocation: string,
    type: string,
    isHit: boolean,
    attempts: number
}

export interface Answer {
    id: string,
    text: string,
    image?: string,
    info?: string,
    allMatched: boolean
}
