import { GameAdapterMock } from "../../__dev__/GameAdapterMock";
import { Difficulty, GameConfig, GameType, GeoLocation } from "../../types/gameConfig";
import { GameAdapter } from "../GameAdapter";
import { Game } from "../Game";
import { EmptyGameAdapterMock } from "../../__dev__/EmptyGameAdapter";
import { Answer, Question } from "../Question";


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


    describe('Validate Answer', () => {

        let currentQuestion : Question
        let correctAnswer : Answer
        let incorrectAnswer : Answer

        beforeEach(() => {
            currentQuestion = game.getQuestions()[0]
            correctAnswer = game.getQuestions()[0].getAnswer()
            incorrectAnswer = game.getQuestions()[1].getAnswer()            
        });

        it('should return true if answer is correct', () => {
            expect(game.validateAnswer(currentQuestion, correctAnswer)).toBeTruthy()
        });

        it('should return false if answer is incorrect', () => {
            expect(game.validateAnswer(currentQuestion, incorrectAnswer)).toBeFalsy()            
        });

        it('should set question property hit to true if answer is correct', () => {
            game.validateAnswer(currentQuestion, correctAnswer)
            expect(currentQuestion.isHit()).toBeTruthy()
        });

        it('should set question property hit to false if answer is incorrect', () => {
            game.validateAnswer(currentQuestion, incorrectAnswer)
            expect(currentQuestion.isHit()).toBeFalsy()            
        });

        it('should increase question property attempts number if question property hit is false and answer is incorrect', () => {
            expect(currentQuestion.getAttempts()).toBe(0)
            expect(currentQuestion.isHit()).toBeFalsy()
            const numberOfAttempts = 3
            for (let index = 0; index < numberOfAttempts; index++) {
                game.validateAnswer(currentQuestion, incorrectAnswer)
            }
            expect(currentQuestion.isHit()).toBeFalsy()
            expect(currentQuestion.getAttempts()).toBe(numberOfAttempts)
        });

        it('should increase question property attempts number if question property hit is false and answer is correct', () => {
            expect(currentQuestion.getAttempts()).toBe(0)
            expect(currentQuestion.isHit()).toBeFalsy()
            const numberOfAttempts = 1
            game.validateAnswer(currentQuestion, correctAnswer)
            expect(currentQuestion.getAttempts()).toBe(numberOfAttempts)
        });

        it('should never increase question number of attempts if question hit is already true', () => {
            expect(currentQuestion.getAttempts()).toBe(0)
            expect(currentQuestion.isHit()).toBeFalsy()

            const attempstBeforeHit = 10
            for (let index = 0; index < attempstBeforeHit; index++) {
                game.validateAnswer(currentQuestion, incorrectAnswer)
            }

            // Hit
            game.validateAnswer(currentQuestion, correctAnswer)

            const computedAttempts = attempstBeforeHit + 1

            // Extra Attempts After Hit - Should not be computed
            game.validateAnswer(currentQuestion, incorrectAnswer)
            game.validateAnswer(currentQuestion, correctAnswer)
            
            expect(currentQuestion.getAttempts()).toBe(computedAttempts)
        });

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


        // todo: JSON.Stringify não tá conseguindo ler as propriedades privadas e tá deixando como se fosse vazio
        it('multiple lists should be outputed with a minimum of different orders, given the number of geoitem elements', async () => {
            const totalElements = game.getQuestions().length
             
            const totalCombinations = factorial(totalElements)
            const desiredCoverage = 0.6  // 60% das combinações
            const expectedUnique = Math.floor(totalCombinations * desiredCoverage)
            const numTests = Math.ceil(totalCombinations * 2)  // 2x para boa cobertura

            const results = new Set();
            for (let i = 0; i < numTests; i++) {
                const game = await Game.createGame(gameConfig, gameAdapter)
                console.log(game.getQuestions());
                
                results.add(JSON.stringify(game.getQuestions()))
            }            
            expect(results.size).toBeGreaterThan(expectedUnique)
        })

    })


    describe('NextQuestion', () => {

        // TODO: não é determinístico, realmente precisa de um teste de unidade aqui...
        it('should not return Question whose property hit is true', () => {
            // Marcar todas as questões como hit, exceto a última
            const totalQuestions = game.getQuestions().length

            const questionHit : Question = game.getQuestions()[0]

            game.validateAnswer(questionHit, questionHit.getAnswer())
            
            expect(questionHit.isHit()).toBeTruthy()

            expect(game.getQuestions().filter(question => question.isHit())).toEqual([questionHit])

            const numberOfTests = totalQuestions * 100
            for (let i = 0; i < numberOfTests; i++) {
                expect(game.nextQuestion()).not.toBe(questionHit)
            }

        })

        it('should return null if all Questions property hit are true', () => {
            
            game.getQuestions().forEach((question) => {
                game.validateAnswer(question, question.getAnswer())
            })

            game.getQuestions().forEach((question) => 
                expect(question.isHit()).toBeTruthy()
            )

            const numberOfTests = game.getQuestions().length * 50
            for (let i = 0; i < numberOfTests; i++) {
                expect(game.nextQuestion()).toBeNull()
            }
        })
        
        it('should not return null, when there is at least one Question whose property hit is false', () => {
            const totalQuestions = game.getQuestions().length
            for (let i = 0; i < totalQuestions - 1; i++) {
                game.validateAnswer(game.getQuestions()[i], game.getQuestions()[i].getAnswer())
            }
            const questionUnhit = game.getQuestions()[totalQuestions - 1]
            expect(questionUnhit.isHit()).toBeFalsy()
            expect(game.getQuestions().filter(question => !question.isHit())).toEqual([questionUnhit])

            const numberOfTests = totalQuestions * 50
            for (let i = 0; i < numberOfTests; i++) {
                const nextQuestion = game.nextQuestion()
                expect(nextQuestion).not.toBeNull()
            }
        })

        // todo: JSON.Stringify não tá conseguindo ler as propriedades privadas e tá deixando como se fosse vazio
        it('should return random question, that is, it should be output with a minimum of different orders, given the number of questions', () => {
            const totalQuestions = game.getQuestions().length
            const sampleSize = Math.min(totalQuestions * 10, 100)
            
            const results = new Set()
            for (let i = 0; i < sampleSize; i++) {
                const sequence = []
                for (let j = 0; j < totalQuestions; j++) {
                    const nextQuestion = game.nextQuestion()
                    if (nextQuestion) {
                        sequence.push(nextQuestion)
                    }
                }
                results.add(JSON.stringify(sequence))
            }
            
            // Espera pelo menos 30% de sequências únicas
            const expectedUnique = Math.max(Math.floor(sampleSize * 0.3), 2)
            expect(results.size).toBeGreaterThanOrEqual(expectedUnique)
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