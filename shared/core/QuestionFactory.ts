import { GameConfig, GameType } from "@/types/GameConfig";
import { GeoItem } from "@/types/GeoItem";
import { Question, QuestionProps } from "./Question";
import { Answer } from "./Answer";

export abstract class QuestionFactory {

    abstract createQuestions(geoItems: GeoItem[]): Question[]

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

    findNextQuestion(questions: Question[]): Question | null {
        const candidates = this.filterHitQuestions(questions)
        const length = candidates.length

        if (length == 0) {
            return null
        }

        const index = this.randomArrayIndex(length)
        return candidates[index]
    }

    protected shuffleList(array: any[]): any[] {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

    private randomArrayIndex(arrayLength: number) {
        return Math.floor(Math.random() * arrayLength)
    }

    protected filterHitQuestions(questions: Question[]) : Question[] {
        return questions.filter((question) => !question.isHit())
    }

}


export class FlagQuestionFactory extends QuestionFactory {
    
    createQuestions(geoItems: GeoItem[]): Question[] {
        let idCounter = 0
        const questions: Question[] = geoItems.map(geoItem => {
            const questionProps: QuestionProps = {
                id: String(idCounter++),
                text: geoItem.flag.description,
                image: geoItem.flag.file,
                hint: geoItem.flag.description,
                answer: new Answer ({
                    id: String(idCounter),
                    text: geoItem.country.name,
                    info: geoItem.flag.info,
                    allMatched: false
                }),
                status: {
                    attempts: 0,
                    hit: false
                },
                geoLocation: geoItem.geoLocation,
                type: GameType.FLAGS
            }
            return new Question(questionProps)
        })
        const shuffledQuestions = this.shuffleList(questions)
        return shuffledQuestions

    }

}

export class CountryQuestionFactory extends QuestionFactory {

    createQuestions(geoItems: GeoItem[]): Question[] {
        throw new Error("Method not implemented.");
    }

}