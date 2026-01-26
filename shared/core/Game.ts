import { Difficulty, GameConfig, GameType, GeoLocation } from "@/types/gameConfig";
import { GameAdapter } from "@/core/GameAdapter";
import { GameEngine } from "./GameEngine";
import { Answer, Question } from "./Question";
import { AnswerRO, QuestionRO } from "../types/questionRO";
import { GameError } from "./errors";


export class Game {

    private readonly gameEngine : GameEngine

    private constructor (
        gameConfig: GameConfig, 
        adpater: GameAdapter
    ) { 
        const itemRepo = adpater.getGeoItemRepository()
        const sessionRepo = adpater.getSessionRepository()
        const timer = adpater.getTimer()
        this.gameEngine = GameEngine.fromConfig(itemRepo, sessionRepo, timer, gameConfig)
    }

    static async createGame(gameConfig: GameConfig, gameAdapter: GameAdapter): Promise<Game> {
        const game = new Game(gameConfig, gameAdapter);
        await game.gameEngine.initialize();
        return game;
    }

    static async loadGame(sessionId: string, gameAdapter: GameAdapter): Promise<Game | undefined> {
        // Retrieve config from repository, se não encontrar, não retorna nada? Retorna um Optional? 
        const gameConfig : GameConfig = {
            gameType: GameType.FLAGS,
            location: GeoLocation.BRAZIL,
            difficulty: Difficulty.EASY
        }
        // Aqui vai fazer o Game Engine from Session!!
        return new Game(gameConfig, gameAdapter);
    }

    start() : void {

    }

    async save(): Promise<void> {
        // Salva GameSession e GameProgress ... 
        // ... se GameProgress estiver como não iniciado ou terminado, não precisa salvar as questões
    }

    async end(): Promise<void> {
    
    }

    pause() {

    }

    resume() {

    }

    validateAnswer(questionRO: QuestionRO, answerRO: AnswerRO): QuestionRO { 
        const question : Question | undefined = this.gameEngine.getSession().questions.find(q => q.getId() == questionRO.id)
        if (!question) 
            throw new GameError(`Question #${questionRO.id} NOT FOUND in this game session`)
        
        const answer : Answer | undefined = this.gameEngine.getAnswers().find(a => a.getId() == answerRO.id)
        if (!answer) 
            throw new GameError(`Answer #${answerRO.id} NOT found in this game session`)
        
        this.gameEngine.submitAnswer(question, answer)
        return question.toJSON()
        
    }
    
    isGameOver(): boolean { 
        return this.gameEngine.isGameOver()
    }

    getQuestions(): QuestionRO[] {       
        return this.gameEngine.getSession().questions.map((q) => q.toJSON())
    }

    nextQuestion() : QuestionRO | null {
        const nextQuestion = this.gameEngine.nextQuestion()
        return nextQuestion ? nextQuestion.toJSON() : null
    }

    getCurrentQuestion(): QuestionRO | null {
        return null
    }

    getAnswer(questionRO: QuestionRO) : AnswerRO | null {
        const question = this.gameEngine.getSession().questions.find(q => q.getId() == questionRO.id)
        if (!question) return null
        return this.gameEngine.getAnswer(question).toJSON()
    }

    getAnswers() : AnswerRO[] {
        return this.gameEngine.getAnswers().map(a => a.toJSON())
    }
 

}