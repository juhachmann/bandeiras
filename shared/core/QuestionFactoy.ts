import { GameConfig, GameType, GeoLocation } from "@/types/gameConfig";
import { GeoItem } from "@/types/geoItem";
import { Answer, Question, QuestionProps } from "./Question";

export abstract class QuestionFactory {

    // Será que a lista de geoItems tem que vir de fora ou essa classe que tem que pegar?
    abstract createQuestions(geoItems: GeoItem[]): Question[]

    abstract validateAnswer(question: Question, answer: Answer): boolean

    static create(gameConfig: GameConfig): QuestionFactory {
        switch (gameConfig.gameType) {
            case GameType.FLAGS:
                return new FlagQuestionFactory();
            case GameType.COUNTRIES:
                return new CountryQuestionFactory();
            default: // TODO: pode ter um FactoryPadrão ou Factory Nulo...
                return new FlagQuestionFactory();
        }
    }

    protected shuffleList(array: any[]): any[] {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

    protected randomArrayIndex(arrayLength: number) {
        return Math.floor(Math.random() * arrayLength)
    }

    findNextQuestion(questions: Question[]): Question | null {
        const candidates = questions.filter((question) => !question.isHit())
        const length = candidates.length

        if (length == 0) {
            return null
        }

        const index = this.randomArrayIndex(length)
        return candidates[index]
    }

}


export class FlagQuestionFactory extends QuestionFactory {
    
    validateAnswer(question: Question, answer: Answer): boolean {
        if (!question.isHit()) {
            question.attempted()
        }
        const isCorrect : boolean = question.getId() == answer.getId()
        if (isCorrect && !question.isHit()) {
            question.hit()
        }
        return isCorrect
    }

    createQuestions(geoItems: GeoItem[]): Question[] {
        const questions: Question[] = geoItems.map(geoItem => {
            const questionProps: QuestionProps = {
                geoItemId: String(geoItem.flag.country_id),
                text: geoItem.flag.description,
                image: geoItem.flag.file,
                hint: geoItem.flag.description,
                answer: new Answer ({
                    geoItemId: String(geoItem.flag.country_id),
                    text: geoItem.country.name,
                    info: geoItem.flag.info,
                }),
                status: {
                    attempts: 0,
                    hit: false
                }
            }
            return new Question(questionProps)
        })
        const shuffledQuestions = this.shuffleList(questions)
        return shuffledQuestions

    }



}

export class CountryQuestionFactory extends QuestionFactory {
    validateAnswer(question: Question, answer: Answer): boolean {
        throw new Error("Method not implemented.");
    }

    createQuestions(geoItems: GeoItem[]): Question[] {
        throw new Error("Method not implemented.");
    }



}