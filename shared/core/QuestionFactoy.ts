import { GameConfig, GameType, GeoLocation } from "@/types/gameConfig";
import { GeoItem } from "@/types/geoItem";
import { Question } from "@/types/question";

export abstract class QuestionFactory {

    // Será que a lista de geoItems tem que vir de fora ou essa classe que tem que pegar?
    abstract createQuestions(geoItems : GeoItem[]) : Question[]

    abstract validateAnswer(question: Question[], selectedId: string) : boolean

    static create (gameConfig: GameConfig) : QuestionFactory {
        switch (gameConfig.gameType) {
            case GameType.FLAGS:
                return new FlagQuestionFactory();
            case GameType.COUNTRIES:
                return new CountryQuestionFactory();
            default: // TODO: pode ter um FactoryPadrão ou Factory Nulo...
                return new FlagQuestionFactory();
        }
    }

    protected shuffleList(array: any[]) : any[] {
        return array
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
    }

}


export class FlagQuestionFactory extends QuestionFactory {

    createQuestions(geoItems: GeoItem[]): Question[] {
        const questions : Question[] = geoItems.map(geoItem => {
            const question : Question = {
                geoItemId: String(geoItem.flag.country_id),
                text: geoItem.flag.description,
                image: geoItem.flag.file,
                hint: geoItem.flag.description,
                answer: {
                    geoItemId: String(geoItem.flag.country_id),
                    text: geoItem.country.name,
                    info: geoItem.flag.info,
                },
                status: {
                    attempts: 0,
                    hit: false
                }
            }
            return question
        })
        return this.shuffleList(questions)

    }

    validateAnswer(question: Question[], selectedId: string): boolean {
        throw new Error("Method not implemented.");
    }

}

export class CountryQuestionFactory extends QuestionFactory {

    createQuestions(geoItems: GeoItem[]): Question[] {
        throw new Error("Method not implemented.");
    }

    validateAnswer(question: Question[], selectedId: string): boolean {
        throw new Error("Method not implemented.");
    }

}