import { GameTimerMock } from "@/__dev__/GameTimerMock";
import { GameConfig, GameType, GeoLocation } from "@/types/GameConfig";
import { GameAdapter } from "../GameAdapter";
import { GameAdapterMock } from "@/__dev__/GameAdapterMock";
import { GameSession } from "../GameSession";
import { Game } from "../Game";
import { Question, QuestionProps } from "../Question";
import { getOneQuestion } from "@/__dev__/QuestionsMock";

describe('GameSession', () => {

    const gameConfig : GameConfig = {
        gameType: GameType.FLAGS,
        location: GeoLocation.BRAZIL
    }
    
    const gameAdapter : GameAdapter = new GameAdapterMock()

    describe('create', () => {

        it('should create a new GameSession, given a GameConfig and a GameAdapter', () => {
            expect(GameSession.create(gameAdapter, gameConfig)).toBeInstanceOf(GameSession)
        });

    })

    describe('getGame', () => {

        const gameSession : GameSession = GameSession.create(gameAdapter, gameConfig)
        let game : Game

        beforeEach(() => {
            game = gameSession.getGame()
        });

        it('should return a Game object', () => {
            expect(game).toBeInstanceOf(Game)
        });

        it('should return a Game object with same GeoLocation defined in GameConfig', () => {
            expect(game.getGeoLocation()).toBe(gameConfig.location)
        });

        it('should return a Game object with same GameType defined in GameConfig', () => {
            expect(game.getGameType()).toBe(gameConfig.gameType)
        });

    });


    describe('isGameOver', () => {

        const gameSession : GameSession = GameSession.create(gameAdapter, gameConfig)
        let game : Game

        beforeEach(() => {
            game = gameSession.getGame()
        });

        it('should return false if game has next question', () => {
            const question = getOneQuestion()
            jest.spyOn(game, 'getNextQuestion').mockReturnValue(question)  
            expect(gameSession.isGameOver()).toBeFalsy()
        });

        it('should return true if game has no current question', () => {
            jest.spyOn(game, 'getNextQuestion').mockReturnValue(null)  
            expect(gameSession.isGameOver()).toBeTruthy()
        });

    });

})