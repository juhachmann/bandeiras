import { GameConfig, GameType, GeoLocation } from "@/types/gameConfig";
import { GeoItem } from "@/types/geoItems";
import { Question } from "@/types/questions";

export abstract class QuestionFactory {

    // Será que a lista de geoItems tem que vir de fora ou essa classe que tem que pegar?
    abstract createQuestions(geoItems : GeoItem[]) : Question[]

    abstract validateAnswer(question: Question[], selectedId: string) : boolean

    static create (gameConfig: GameConfig) : QuestionFactory | null {
        switch (gameConfig.gameType) {
            case GameType.FLAGS:
                return new FlagQuestionFactory();
            case GameType.COUNTRIES:
                return new CountryQuestionFactory();
            default:
                return null
        }
    }

}


class FlagQuestionFactory extends QuestionFactory {

    createQuestions(geoItems: GeoItem[]): Question[] {
        throw new Error("Method not implemented.");
    }

    validateAnswer(question: Question[], selectedId: string): boolean {
        throw new Error("Method not implemented.");
    }

}

class CountryQuestionFactory extends QuestionFactory {

    createQuestions(geoItems: GeoItem[]): Question[] {
        throw new Error("Method not implemented.");
    }

    validateAnswer(question: Question[], selectedId: string): boolean {
        throw new Error("Method not implemented.");
    }

}