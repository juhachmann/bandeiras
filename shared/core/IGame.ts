import { GameConfig, GameType, GeoLocation } from "@/types/GameConfig"
import { GameAdapter } from "./GameAdapter"
import { GameSession } from "./GameSession"


export class GameSessionLoader {

    private constructor() {}

    static async createNew(gameAdapter : GameAdapter, gameConfig: GameConfig) : Promise<IGameSession> {
        const session = new GameSession(gameAdapter, gameConfig)
        await session.initialize()
        return session
    }
    
}


export interface IGameSession {
    getGame() : IGame 
    isGameOver(): boolean 
}


export interface IGame {
    getGeoLocation(): GeoLocation 
    getGameType(): GameType 
    nextQuestion() : IQuestion | null 
    getQuestions(): IQuestion[] 
    getAnswers() : IAnswer[] 
    getCurrentQuestion(): IQuestion | null 
}


export interface IQuestion {
    
    getId() : string 
    getAnswer() : IAnswer
    getText() : string 
    getHint() : string | null 
    getImage() : string | null 
    getGeoLocation(): GeoLocation 
    getType(): GameType 
    isHit() : boolean 
    getAttempts() : number 
    attempt(answer : IAnswer) : boolean 

}


export interface IAnswer {
    getId() : string 
    getText() : string
    getImage() : string | null 
    getInfo() : string | null 
    getAllMatched() : boolean 
}

