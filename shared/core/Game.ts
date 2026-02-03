import { GameConfig, GameType, GeoLocation } from "@/types/GameConfig";
import { Question } from "./Question";
import { GeoItem } from "@/types/GeoItem";
import { QuestionFactory } from "./QuestionFactory";
import { Answer } from "./Answer";
import { IGame } from "./IGame";

export class Game implements IGame {
    
    private questions : IQuestion[] = []
    private answers: Answer[] = []
    private currentQuestion : Question | null = null

    constructor(
        private readonly gameconfig : GameConfig,
        private readonly geoItems: GeoItem[]
    ) {
        this.setQuestions()
        this.setAnswers()
        this.setInitialQuestion()
    }

    getGeoLocation(): GeoLocation {
        return this.gameconfig.location
    }

    getGameType(): GameType {
        return this.gameconfig.gameType
    }

    nextQuestion() : Question | null {
        if (this.questions.length == 0) {
            return null
        }
        const nextQuestion = this.getRandomValidQuestion()
        this.currentQuestion = nextQuestion
        return nextQuestion
    }

    getQuestions(): Question[] {
        return this.questions
    }

    getAnswers() : Answer[] {
        return this.answers
    }

    getCurrentQuestion(): Question | null {
        return this.currentQuestion
    }


    private setQuestions() : void {
        if (this.geoItems.length > 0) {
            const questionFactory = QuestionFactory.create(this.gameconfig)
            this.questions = questionFactory.createQuestions(this.geoItems)
        }
    }

    private setAnswers() : void {
        if (this.questions.length > 0) {
            this.answers = this.questions.map(question => question.getAnswer())
        }
    }

    private setInitialQuestion() : void {
        this.nextQuestion()
    }

    private getRandomValidQuestion() : Question | null {
        const candidates = this.questions.filter((question) => !question.isHit())
        const length = candidates.length

        if (length == 0) {
            return null
        }

        const index = this.randomArrayIndex(length)
        return candidates[index]

    }

    private randomArrayIndex(arrayLength: number) {
        return Math.floor(Math.random() * arrayLength)
    }

   

}