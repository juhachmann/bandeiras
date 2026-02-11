import { IQuestion, GeoItem, GameConfig, GameType } from "../types/types";
import { Question, QuestionProps } from "./Question";
import { Answer } from "./Answer";

export abstract class QuestionFactory {

    abstract createQuestions(geoItems: GeoItem[]): IQuestion[]

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

}


export class FlagQuestionFactory extends QuestionFactory {
    
    createQuestions(geoItems: GeoItem[]): IQuestion[] {
        let idCounter = 0
        const questions: IQuestion[] = geoItems.map(geoItem => {
            const questionProps: QuestionProps = {
                id: String(idCounter++),
                text: geoItem.flag.description,
                image: geoItem.flag.file,
                hint: geoItem.flag.description,
                answer: new Answer ({
                    id: String(idCounter),
                    text: geoItem.country.name,
                    info: geoItem.flag.info,
                    allMatched: false,
                    image: geoItem.flag.file
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

    createQuestions(geoItems: GeoItem[]): IQuestion[] {
        throw new Error("Method not implemented.");
    }

}