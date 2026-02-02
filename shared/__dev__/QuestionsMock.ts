import { Answer } from "@/core/Answer";
import { Question } from "@/core/Question";
import { GeoLocation } from "@/types/GameConfig";

const questions : Question[] = [
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
        geoLocation: GeoLocation.BRAZIL
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
        geoLocation: GeoLocation.BRAZIL

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
    geoLocation: GeoLocation.BRAZIL
    }),

]

export const getOneQuestion = () : Question => {
    return questions[0]
}

export const getQuestionList = () : Question[] => {
    return questions
}
