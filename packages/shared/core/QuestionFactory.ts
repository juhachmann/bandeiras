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
                id: String(geoItem.country.id),
                text: geoItem.country.name,
                image: undefined,
                hint: undefined,
                answer: new Answer ({
                    id: String(geoItem.flag.country_id),
                    text: geoItem.flag.description,
                    info: geoItem.flag.info,
                    allMatched: false,
                    image: geoItem.flag.file,
                    iso3661: geoItem.country.iso3661
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