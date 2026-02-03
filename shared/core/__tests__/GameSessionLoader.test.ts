import { GameAdapter } from "../GameAdapter";
import { GameAdapterMock } from "@/__dev__/GameAdapterMock";
import { gameConfigMock } from "@/__dev__/GameConfigMock";
import { GameSessionLoader, IGameSession } from "../IGame";
import { GameSession } from "../GameSession";

describe('GameSessionLoader', () => {

    describe('createNew', () => {
        
        const gameConfig = gameConfigMock        
        const gameAdapter : GameAdapter = new GameAdapterMock()
        let gameSession : IGameSession

        beforeEach(async () => {
            gameSession = await GameSessionLoader.createNew(gameAdapter, gameConfig)
        });
    
        it('should create a new GameSession, given a GameConfig and a GameAdapter', async () => {
            expect(gameSession).toBeInstanceOf(GameSession)
        });

        it('should create game Questions with same GeoLocation as of gameConfig', () => {
            const game = gameSession.getGame()
            const questions = game.getQuestions()
            questions.forEach(q => expect(q.getGeoLocation()).toEqual(gameConfig.location))
        });

        it('should create Questions with same Type as of gameConfig', () => {
            const game = gameSession.getGame()
            const questions = game.getQuestions()
            questions.forEach(q => expect(q.getType()).toEqual(gameConfig.gameType))
        });

    })        

    
});