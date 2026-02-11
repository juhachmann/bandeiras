import { IAnswer } from "../types/types";

export interface AnswerProps {
  id: string;
  text: string;
  image?: string;
  info?: string;
  allMatched: boolean;
  iso31661?: string;
}

export class Answer implements IAnswer {

    private readonly id: string
    private readonly text: string
    private readonly image: string | null
    private readonly info: string | null
    private allMatched : boolean
    private readonly iso31661: string | null

    constructor (answerProps : AnswerProps) {
        this.id = answerProps.id
        this.text = answerProps.text
        this.image = answerProps.image ?? null
        this.info = answerProps.info ?? null
        this.allMatched = answerProps.allMatched
        this.iso31661 = answerProps.iso31661 ?? null
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

    getIso31661(): string | null {
        return this.iso31661
    }

}
