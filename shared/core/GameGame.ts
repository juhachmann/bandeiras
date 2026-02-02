import { Difficulty, GameConfig, GameType, GeoLocation } from "@/types/GameConfig";
import { GameAdapter } from "@/core/GameAdapter";
import { GameEngine } from "./GameEngine";
import { Question } from "./Question";
import { GameError } from "./errors";
import { Answer } from "./Answer";


// TODO: expor Game (GameEngine) e GameSession => duas classes diferentes
// GameSession = load, new, save, quit, isGameOver, getScore, getTime, getStats
// Game = getQuestions, getAnswers, nextQuestion, currentQuestion
export class GameGame {

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

    static async createGame(gameConfig: GameConfig, gameAdapter: GameAdapter): Promise<GameGame> {
        const game = new GameGame(gameConfig, gameAdapter);
        await game.gameEngine.initialize();
        return game;
    }

    static async loadGame(sessionId: string, gameAdapter: GameAdapter): Promise<GameGame | undefined> {
        // Retrieve config from repository, se não encontrar, não retorna nada? Retorna um Optional? 
        const gameConfig : GameConfig = {
            gameType: GameType.FLAGS,
            location: GeoLocation.BRAZIL,
            difficulty: Difficulty.EASY
        }
        // Aqui vai fazer o Game Engine from Session!!
        return new GameGame(gameConfig, gameAdapter);
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

    // Fica em Question
    // validateAnswer(questionRO: QuestionRO, answerRO: AnswerRO): QuestionRO { 
    //     const question : Question | undefined = this.gameEngine.getSession().questions.find(q => q.getId() == questionRO.id)
    //     if (!question) 
    //         throw new GameError(`Question #${questionRO.id} NOT FOUND in this game session`)
        
    //     const answer : Answer | undefined = this.gameEngine.getAnswers().find(a => a.getId() == answerRO.id)
    //     if (!answer) 
    //         throw new GameError(`Answer #${answerRO.id} NOT found in this game session`)
        
    //     this.gameEngine.submitAnswer(question, answer)
    //     return question.toJSON()
        
    // }
    
    isGameOver(): boolean { 
        return this.gameEngine.isGameOver()
    }

    getQuestions(): Question[] {       
        return this.gameEngine.getSession().questions
    }

    nextQuestion() : Question | null {
        return this.gameEngine.nextQuestion()
    }

    getCurrentQuestion(): Question | null {
        return null
    }

    // Vai ficar em Question
    // getAnswer(questionRO: QuestionRO) : AnswerRO | null {
    //     const question = this.gameEngine.getSession().questions.find(q => q.getId() == questionRO.id)
    //     if (!question) return null
    //     return this.gameEngine.getAnswer(question).toJSON()
    // }

    getAnswers() : Answer[] {
        return this.gameEngine.getAnswers()
    }


 

}