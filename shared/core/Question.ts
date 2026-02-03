import { IAnswer, IQuestion, GameType, GeoLocation } from "../types/types";
import { Answer } from "./Answer";

export interface QuestionStatus {
  attempts: number;
  hit: boolean;
}

export interface QuestionProps {
  id: string;
  text: string;
  image?: string;
  hint?: string;
  answer: IAnswer;
  status: QuestionStatus;
  geoLocation: GeoLocation;
  type: GameType;
}


export class Question implements IQuestion {
    
    private readonly id: string
    private readonly text: string
    private readonly image: string | null = null
    private readonly hint: string | null = null
    private readonly answer: IAnswer
    private readonly status: QuestionStatus
    private readonly geoLocation: GeoLocation
    private readonly type: GameType

    constructor(
        questionProps : QuestionProps
    ) {
        this.id = questionProps.id
        this.answer = questionProps.answer
        this.status = questionProps.status
        this.text = questionProps.text
        this.geoLocation = questionProps.geoLocation
        this.type = questionProps.type
    }

    getId() : string {
        return this.id
    }

    getAnswer() : IAnswer {
        return this.answer
    }

    getText() : string {
        return this.text
    }

    getHint() : string | null {
        return this.hint
    }

    getImage() : string | null {
        return this.image
    }

    getGeoLocation(): GeoLocation {
        return this.geoLocation
    }

    getType(): GameType {
        return this.type
    }

    isHit() : boolean {
        return this.status.hit
    }

    getAttempts() : number {
        return this.status.attempts
    }

    attempt(answer : Answer) : boolean {
        const isCorrectAnswer = answer == this.answer

        if (!this.isHit()) {
            
            this.status.attempts++

            if (isCorrectAnswer) {
                this.status.hit = true
            }

        }
        
        return isCorrectAnswer
        
    }

}

