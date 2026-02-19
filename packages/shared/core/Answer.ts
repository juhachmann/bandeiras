import { IAnswer } from "../types/types";

export interface AnswerProps {
  id: string;
  text: string;
  image?: string;
  info?: string;
  allMatched: boolean;
  code?: string;
  codeType?: string
}

export class Answer implements IAnswer {

    private readonly id: string
    private readonly text: string
    private readonly image: string | null
    private readonly info: string | null
    private allMatched : boolean
    private readonly code: string | null
    private readonly codeType: string | null

    constructor (answerProps : AnswerProps) {
        this.id = answerProps.id
        this.text = answerProps.text
        this.image = answerProps.image ?? null
        this.info = answerProps.info ?? null
        this.allMatched = answerProps.allMatched
        this.code = answerProps.code ?? null
        this.codeType = answerProps.codeType ?? null
    }


    getId() : string {
        return this.id
    }

    getText() : string {
        return this.text
    }

    getImage() : string | null {
        return this.image
    }

    getInfo() : string | null {
        return this.info
    }

    getAllMatched() : boolean {
        return this.allMatched
    }

    getCode(): string | null {
        return this.code
    }

    getCodeType(): string | null {
        return this.codeType
    }

}
