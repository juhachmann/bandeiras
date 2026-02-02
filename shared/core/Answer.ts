
export interface AnswerProps {
  id: string;
  text: string;
  image?: string;
  info?: string;
  allMatched: boolean
}

export class Answer {

    private readonly id: string
    private readonly text: string
    private readonly image: string | null
    private readonly info: string | null
    private allMatched : boolean

    constructor (answerProps : AnswerProps) {
        this.id = answerProps.id
        this.text = answerProps.text
        this.image = answerProps.image ?? null
        this.info = answerProps.info ?? null
        this.allMatched = answerProps.allMatched
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

}
