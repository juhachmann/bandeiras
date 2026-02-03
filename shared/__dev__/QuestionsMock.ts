import { Answer } from "../core/Answer"
import { Question } from "../core/Question"
import { GameType, GeoLocation, IQuestion } from "../types/types"

const questions : IQuestion[] = [
    new Question({
        id: "A",
        text: "Question A",
        answer: new Answer({
            id: "A",
            text: "Answer A",
        allMatched: false
        }),
        status: {
            attempts: 0,
            hit: false
        },
        geoLocation: GeoLocation.BRAZIL,
        type: GameType.FLAGS
    }),
    new Question({
        id: "B",
        text: "Question B",
        answer: new Answer({
            id: "A",
            text: "Answer B",
        allMatched: false
        }),
        status: {
            attempts: 0,
            hit: false
        },
        geoLocation: GeoLocation.BRAZIL,
        type: GameType.FLAGS

    }),
    new Question({
        id: "C",
        text: "Question C",
        answer: new Answer({
            id: "C",
            text: "Answear C",
        allMatched: false
        }),
        status: {
            attempts: 0,
            hit: false
        },
        geoLocation: GeoLocation.BRAZIL,
        type: GameType.FLAGS
    }),

]

export const getOneQuestion = () : IQuestion => {
    return questions[0]
}

export const getQuestionList = () : IQuestion[] => {
    return questions
}
