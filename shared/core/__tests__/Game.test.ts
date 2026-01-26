import { GameAdapterMock } from "../../__dev__/GameAdapterMock";
import { Difficulty, GameConfig, GameType, GeoLocation } from "../../types/gameConfig";
import { GameAdapter } from "../GameAdapter";
import { Game } from "../Game";
import { EmptyGameAdapterMock } from "../../__dev__/EmptyGameAdapter";
import { AnswerRO, QuestionRO } from "../../types/questionRO";


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


    it('should contain a Question List', () => {
        expect(game.getQuestions()).toBeInstanceOf(Array);
    })

    it('should contain a Answer List', () => {
        expect(game.getAnswers()).toBeInstanceOf(Array);
    });

    it('Qustion List and Answer List should have same size', () => {
        expect(game.getQuestions().length).toBe(game.getAnswers().length)
    });

    it('should not be able to modify number of attempts of the question', () => {
        expect(game.getQuestions()).toBeInstanceOf(Array);
    })

    it('should not be able to modify number of attempts of the question', () => {
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

    describe('Validate Answer', () => {

        let currentQuestion : QuestionRO
        let correctAnswer : AnswerRO
        let incorrectAnswer : AnswerRO

        beforeEach(() => {
            currentQuestion = game.getQuestions()[0]
            correctAnswer = game.getAnswer(currentQuestion)!
            incorrectAnswer = game.getAnswer(game.getQuestions()[1])!            
        });

        it('should set "result" question property hit to true if answer is correct', () => {
            const result = game.validateAnswer(currentQuestion, correctAnswer)
            expect(result.hit).toBeTruthy()
        });

        it('should set "result" question property hit to false if answer is incorrect', () => {
            const result = game.validateAnswer(currentQuestion, incorrectAnswer)
            expect(result.hit).toBeFalsy()            
        });

        it('should increase "result" question property attempts number if question property hit is false and answer is incorrect', () => {
            expect(currentQuestion.attempts).toBe(0)
            expect(currentQuestion.hit).toBeFalsy()
            const numberOfAttempts = 3
            let resultQuestion = currentQuestion
            for (let index = 0; index < numberOfAttempts; index++) {
                resultQuestion = game.validateAnswer(resultQuestion, incorrectAnswer)
            }
            expect(resultQuestion.hit).toBeFalsy()
            expect(resultQuestion.attempts).toBe(numberOfAttempts)
        });

        it('should increase "result" question property attempts number if question property hit is false and answer is correct', () => {
            expect(currentQuestion.attempts).toBe(0)
            expect(currentQuestion.hit).toBeFalsy()
            const numberOfAttempts = 1
            const resultQuestion = game.validateAnswer(currentQuestion, correctAnswer)
            expect(resultQuestion?.attempts).toBe(numberOfAttempts)
        });

        it('should never increase "result" question number of attempts if question hit is already true', () => {
            expect(currentQuestion.attempts).toBe(0)
            expect(currentQuestion.hit).toBeFalsy()

            const attempstBeforeHit = 10
            let resultQuestion = currentQuestion
            for (let index = 0; index < attempstBeforeHit; index++) {
                resultQuestion = game.validateAnswer(resultQuestion, incorrectAnswer)
            }

            // Hit
            resultQuestion = game.validateAnswer(resultQuestion, correctAnswer)

            const computedAttempts = attempstBeforeHit + 1

            // Extra Attempts After Hit - Should not be computed
            resultQuestion = game.validateAnswer(currentQuestion, incorrectAnswer)
            resultQuestion = game.validateAnswer(currentQuestion, correctAnswer)
            
            expect(resultQuestion.attempts).toBe(computedAttempts)
        });

    })





    describe('NextQuestion', () => {

        // Estes testes não são determinísticos
        // Para testes determinísticos, ver testes de unidade para os métodos da classe: QuestionFactory
        it('should not return Question whose property hit is true', () => {
            
            const totalQuestions = game.getQuestions().length

            const question : QuestionRO = game.getQuestions()[0]
            const questionId = question.id
            
            let result = game.validateAnswer(question, game.getAnswer(question)!)
            
            expect(result.hit).toBeTruthy()

            expect(game.getQuestions().filter(question => question.hit).map(q => q.id)).toEqual([questionId])

            const numberOfTests = totalQuestions * 100
            for (let i = 0; i < numberOfTests; i++) {
                expect(game.nextQuestion()?.id).not.toBe(questionId)
            }

        })

        it('should return null if all Questions property hit are true', () => {
            
            const gameQuestions = game.getQuestions()
            const validatedQuestions : QuestionRO[] = []

            gameQuestions.forEach((question) => {
                validatedQuestions.push(game.validateAnswer(question, game.getAnswer(question)!))
            })

            validatedQuestions.forEach((question) => 
                expect(question.hit).toBeTruthy()
            )

            const numberOfTests = gameQuestions.length * 50
            for (let i = 0; i < numberOfTests; i++) {
                expect(game.nextQuestion()).toBeNull()
            }
        })
        
        it('should not return null, when there is at least one Question whose property hit is false', () => {
            const gameQuestions = game.getQuestions()
            const totalQuestions = gameQuestions.length
            const validatedQuestions : QuestionRO[] = []
            for (let i = 0; i < totalQuestions - 1; i++) {
                const validatedQuestion = game.validateAnswer(gameQuestions[i], game.getAnswer(gameQuestions[i])!)
                validatedQuestions.push(validatedQuestion)
            }
            // TODO: parei aqui!!!
            const questionUnhit = gameQuestions[totalQuestions - 1]
            expect(questionUnhit.hit).toBeFalsy()

            console.log(validatedQuestions);
            console.log(questionUnhit);
            
            
            expect(validatedQuestions.filter(question => !question.hit).map(q => q.id)).toEqual([questionUnhit.id])

            const numberOfTests = totalQuestions * 50
            for (let i = 0; i < numberOfTests; i++) {
                const nextQuestion = game.nextQuestion()
                expect(nextQuestion).not.toBeNull()
            }
        })

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