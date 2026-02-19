import { GeoItem, GameConfig, GameType, GeoLocation, IGame, IQuestion, IAnswer, FlagItem } from "../types/types";
import { QuestionFactory } from "./QuestionFactory";

export class Game implements IGame {
    
    private questions : IQuestion[] = []
    private answers: IAnswer[] = []
    private currentQuestion : IQuestion | null = null

    constructor(
        private readonly gameconfig : GameConfig,
        private readonly flagItems: FlagItem[]
    ) {
        this.setQuestions()
        this.setAnswers()
        this.setInitialQuestion()
    }

    getGameType(): GameType {
        return this.gameconfig.gameType
    }

    nextQuestion() : IQuestion | null {
        if (this.questions.length == 0) {
            return null
        }
        const nextQuestion = this.getRandomValidQuestion()
        this.currentQuestion = nextQuestion
        return nextQuestion
    }

    getQuestions(): IQuestion[] {
        return this.questions
    }

    getAnswers() : IAnswer[] {
        return this.answers
    }

    getCurrentQuestion(): IQuestion | null {
        return this.currentQuestion
    }


    private setQuestions() : void {
        if (this.flagItems.length > 0) {
            const questionFactory = QuestionFactory.create(this.gameconfig)
            this.questions = questionFactory.createQuestions(this.flagItems)
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

    private getRandomValidQuestion() : IQuestion | null {
        const candidates = this.questions.filter((question) => !question.isHit())
        const length = candidates.length

        if (length == 0) {
            return null
        }

        const index = Math.floor(Math.random() * length)
        return candidates[index]

    }
   

}