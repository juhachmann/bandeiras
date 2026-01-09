export interface QuestionProps {
  geoItemId: string;
  text: string;
  image?: string;
  hint?: string;
  answer: Answer;
  status: QuestionStatus;
}

export interface QuestionStatus {
  attempts: number;
  hit: boolean;
}

export interface AnswerProps {
  geoItemId: string;
  text: string;
  image?: string;
  info?: string;
}

export interface AnswerResult {
  isCorrect: boolean;
}

export class Question {
    
    #geoItemId: string
    #text: string
    #image: string | null = null
    #hint: string | null = null
    #answer: Answer
    #status: QuestionStatus

    constructor(
        questionProps : QuestionProps
    ) {
        this.#geoItemId = questionProps.geoItemId
        this.#answer = questionProps.answer
        this.#status = questionProps.status
        this.#text = questionProps.text
    }

    getId() : string {
        return this.#geoItemId
    }

    getAnswer() : Answer {
        return this.#answer
    }

    getText() : string {
        return this.#text
    }

    getHint() : string | null {
        return this.#hint
    }

    getImage() : string | null {
        return this.#image
    }

    isHit() : boolean {
        return this.#status.hit
    }

    getAttempts() : number {
        return this.#status.attempts
    }

    attempted() : void {
        this.#status.attempts++
    }

    hit() : void {
        this.#status.hit = true
    }

    
}

export class Answer {

    #geoItemId: string
    #text: string
    #image: string | null
    #info: string | null

    constructor (answerProps : AnswerProps) {
        this.#geoItemId = answerProps.geoItemId
        this.#text = answerProps.text
        this.#image = answerProps.image ?? null
        this.#info = answerProps.info ?? null
    }

    getId() : string {
        return this.#geoItemId
    }

    getText() : string {
        return this.#text
    }

    getImage() : string | null {
        return this.#image
    }

    getInfo() : string | null {
        return this.#info
    }

}