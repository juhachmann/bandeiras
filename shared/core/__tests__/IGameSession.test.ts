import { GameAdapter } from "../GameAdapter";
import { GameAdapterMock } from "@/__dev__/GameAdapterMock";
import { Game } from "../Game";
import { getOneQuestion } from "@/__dev__/QuestionsMock";
import { gameConfigMock } from "@/__dev__/GameConfigMock";
import { GameSessionLoader, IGame, IGameSession } from "../IGame";

describe('IGameSession', () => {

    const gameConfig = gameConfigMock        
    const gameAdapter : GameAdapter = new GameAdapterMock()
    let gameSession : IGameSession

    beforeEach(async () => {
        gameSession = await GameSessionLoader.createNew(gameAdapter, gameConfig)
    });

    afterEach(() => {
        jest.restoreAllMocks()
    })

    describe('getGame', () => {

        let game : IGame

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

        let game : IGame

        beforeEach(() => {
            game = gameSession.getGame()
        });

        it('should return false if game has next question', () => {
            const question = getOneQuestion()
            jest.spyOn(game, 'nextQuestion').mockReturnValue(question)  
            expect(gameSession.isGameOver()).toBeFalsy()
        });

        it('should return true if game has no next question', () => {
            jest.spyOn(game, 'nextQuestion').mockReturnValue(null)  
            expect(gameSession.isGameOver()).toBeTruthy()
        });

    });

})