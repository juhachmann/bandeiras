export interface QuestionRO {
    readonly id: string;
    readonly text: string;
    readonly image?: string;
    readonly hint?: string;
    readonly attempts: number;
    readonly hit: boolean;
}

export interface AnswerRO {
    readonly id: string;
    readonly text: string;
    readonly image?: string;
    readonly info?: string;
}
