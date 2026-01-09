import { GameAdapterMock } from "../../__dev__/GameAdapterMock";
import { Difficulty, GameConfig, GameType, GeoLocation } from "../../types/gameConfig";
import { GameAdapter } from "../GameAdapter";
import { Game } from "../Game";
import { EmptyGameAdapterMock } from "../../__dev__/EmptyGameAdapter";


describe('Game', () => {
    
    const gameAdapter: GameAdapter = new GameAdapterMock();
    const emptyGameAdapter = new EmptyGameAdapterMock();

    const gameConfig : GameConfig = {
        gameType: GameType.FLAGS,
        location: GeoLocation.LATIN_AMERICA,
        difficulty: Difficulty.EASY
    }

    let game: Game;

    beforeEach(async () => {
        game = await Game.createGame(gameConfig, gameAdapter);
    });

    // TODO: limitação do TS, não consigo verificar se é mesmo uma lista de Question
    it('should contain a Question List', () => {
        expect(game.getQuestions()).toBeInstanceOf(Array);
    })



    describe('QuestionList', () => {

        it('should be empty when repository data is empty', async () => {
            const emptyGame = await Game.createGame(gameConfig, emptyGameAdapter) 
            expect(emptyGame.getQuestions().length).toBe(0)
        })


        it('should NOT be empty when repository data is NOT empty', async () => {
            const game = await Game.createGame(gameConfig, gameAdapter);
            expect(game.getQuestions().length).toBeGreaterThan(0)        
        })


        it('two lists should have the same elements given the same GameConfig', async () => {
             const gameConfig : GameConfig = {
                gameType: GameType.FLAGS,
                location: GeoLocation.LATIN_AMERICA,
                difficulty: Difficulty.EASY
            }

            const gameA = await Game.createGame(gameConfig, gameAdapter)
            const gameB = await Game.createGame(gameConfig, gameAdapter)

            expect(gameA.getQuestions().length).toBe(gameB.getQuestions().length)

            const setA = new Set(gameA.getQuestions().map(item => JSON.stringify(item)))
            const setB = new Set(gameB.getQuestions().map(item => JSON.stringify(item)))

            expect(setA.size).toBe(setB.size)
            expect([...setA].every(item => setA.has(item))).toBeTruthy()        
        })


        it('multiple lists should be outputed with a minimum of different orders, given the number of geoitem elements', async () => {
            const totalElements = game.getQuestions().length
             
            const totalCombinations = factorial(totalElements)
            const desiredCoverage = 0.6  // 60% das combinações
            const expectedUnique = Math.floor(totalCombinations * desiredCoverage)
            const numTests = Math.ceil(totalCombinations * 2)  // 2x para boa cobertura

            const results = new Set();
            for (let i = 0; i < numTests; i++) {
                const game = await Game.createGame(gameConfig, gameAdapter)
                results.add(JSON.stringify(game.getQuestions()))
            }            
            expect(results.size).toBeGreaterThan(expectedUnique)
        })

    })

    describe('NextQuestion', () => {

        it('should not return Question whose property hit is true', () => {

        })

        it('should return null if all Questions property hit is true', () => {
            
        })
        
        it('should not return null, when there is at least one Question whose property hit is false', () => {
            
        })

        it('should return random question, that is, it should be output with a minimum of different orders, given the number of questions', () => {
                
        })

        it('teste de unidade', () => {
            
        })

    })

})


function factorial(n: number): number {
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}