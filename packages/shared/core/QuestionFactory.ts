import { IQuestion, GeoItem, GameConfig, GameType, FlagItem } from "../types/types";
import { Question, QuestionProps } from "./Question";
import { Answer } from "./Answer";

export abstract class QuestionFactory {

    abstract createQuestions(flagItems: FlagItem[]): IQuestion[]

    static create(gameConfig: GameConfig): QuestionFactory {
        switch (gameConfig.gameType) {
            case GameType.FLAGS:
                return new FlagQuestionFactory();
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
    
    createQuestions(flagItems: FlagItem[]): IQuestion[] {
        const questions: IQuestion[] = flagItems.map(flagItem => {
            const questionProps: QuestionProps = {
                id: String(flagItem.subject.id),
                text: flagItem.subject.name,
                image: undefined,
                hint: undefined,
                answer: new Answer ({
                    id: String(flagItem.flag.subjectId),
                    text: flagItem.flag.description,
                    info: flagItem.flag.info,
                    allMatched: false,
                    image: flagItem.flag.file,
                    code: flagItem.subject.code,
                    codeType: flagItem.subject.codeType
                }),
                status: {
                    attempts: 0,
                    hit: false
                },
                metadata: flagItem.metadata,
                type: GameType.FLAGS
            }
            return new Question(questionProps)
        })
        const shuffledQuestions = this.shuffleList(questions)
        return shuffledQuestions

    }

}
