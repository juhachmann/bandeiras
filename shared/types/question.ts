
export interface Question {
  geoItemId: string;
  text?: string;
  image?: string;
  hint?: string;
  answer: Answer;
  status: QuestionStatus;
}

export interface QuestionStatus {
  attempts: number;
  hit: boolean;
}

export interface Answer {
  geoItemId: string;
  text?: string;
  image?: string;
  info?: string;
}

export interface AnswerResult {
  isCorrect: boolean;
}
