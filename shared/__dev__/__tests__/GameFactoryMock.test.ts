import { IGame } from "@/core/IGame";
import { getEmptyFlagGame, getLatinAmericaFlagGame } from "../GameFactoryMock";
import { GameType, GeoLocation } from "@/types/GameConfig";

describe('GameFactoryMock', () => {

    let game : IGame

    describe('getLatinAmericaFlag_EmptyGame', () => {

        beforeEach(async () => {
            game = await getEmptyFlagGame()
        });
        
        it('should return a game whose geolocation is Latin America', () => {
            expect(game.getGeoLocation()).toBe(GeoLocation.LATIN_AMERICA)           
        });

        it('should return a game whose type is Flag', () => {
            expect(game.getGameType()).toBe(GameType.FLAGS)
        });

        it('should return a game whose question list is EMPTY!', () => {
            expect(game.getQuestions().length).toEqual(0)
        });

    });

    describe('getLatinAmericaFlag_Game', () => {

        beforeEach(async () => {
            game = await getLatinAmericaFlagGame()
        });

        it('should return a game whose geolocation is Latin America', () => {
            expect(game.getGeoLocation()).toBe(GeoLocation.LATIN_AMERICA)           
        });

        it('should return a game whose type is Flag', () => {
            expect(game.getGameType()).toBe(GameType.FLAGS)
        });

        it('should return a game whose question list is NOT EMPTY!', () => {
            expect(game.getQuestions().length).toBeGreaterThan(0)
        });

    });

    
});