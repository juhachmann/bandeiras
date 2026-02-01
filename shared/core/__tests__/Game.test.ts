import { GameAdapterMock } from "../../__dev__/GameAdapterMock";
import { Difficulty, GameConfig, GameType, GeoLocation } from "../../types/GameConfig";
import { GameAdapter } from "../GameAdapter";
import { Game } from "../Game";
import { EmptyGameAdapterMock } from "../../__dev__/EmptyGameAdapter";
import { Answer } from "../Answer";
import { Question } from "../Question";


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

    describe('getQuestions', () => {

        it('should contain a Question List', () => {
            expect(game.getQuestions()).toBeInstanceOf(Array);
        })

        it('should return empty list when repository data is empty', async () => {
            const emptyGame = await Game.createGame(gameConfig, emptyGameAdapter) 
            expect(emptyGame.getQuestions().length).toBe(0)
        })

        it('should NOT return empty list when repository data is NOT empty', async () => {
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

        // Estes testes não são determinísticos
        // Para testes determinísticos, ver testes de unidade para os métodos da classe: QuestionFactory
        it('should not return Question whose property hit is true', () => {
            
            const questionHit : Question = game.getQuestions()[0]
            
            // Forçando mudança interna de status
            questionHit['status'].hit = true
            
            expect(questionHit.isHit()).toBeTruthy()

            expect(game.getQuestions().filter(question => question.isHit()).map(q => q.getId())).toEqual([questionHit.getId()])

            // Teste probabilístico
            const totalQuestions = game.getQuestions().length
            const numberOfTests = totalQuestions * 100
            for (let i = 0; i < numberOfTests; i++) {
                expect(game.nextQuestion()?.getId()).not.toBe(questionHit.getId())
            }

        })

        it('should return null if all Questions are already hit', () => {
            
            const gameQuestions = game.getQuestions()

            gameQuestions.forEach((question) => {
                // Força a mudança de status
                question["status"].hit = true
            })

            gameQuestions.forEach((question) => 
                expect(question.isHit()).toBeTruthy()
            )

            // Teste probabilístico
            const numberOfTests = gameQuestions.length * 50
            for (let i = 0; i < numberOfTests; i++) {
                expect(game.nextQuestion()).toBeNull()
            }
        })
        
        it('should always return same question, when there is only one Question whose property hit is false', () => {
            const gameQuestions = game.getQuestions()
            const totalQuestions = gameQuestions.length

            expect(totalQuestions).toBeGreaterThan(0)

            // Força Hit em todas as questões menos na última
            for (let i = 0; i < totalQuestions - 1; i++) {
                gameQuestions[i]['status'].hit = true
            }

            // Checa se a "última" questão está unHit
            const unHitQuestion = gameQuestions[totalQuestions - 1]
            expect(unHitQuestion.isHit()).toBeFalsy()

            // Checa se há apenas uma questão "unHit"
            const unHitQuestionList = gameQuestions.filter(q => !q.isHit())
            expect(unHitQuestionList.length).toBe(1)

            // Checa se a questão unHit tem o mesmo ID da que sobrou na lista filtrada
            expect(unHitQuestionList.map(q => q.getId())).toStrictEqual([unHitQuestion.getId()])

            // Teste probabilístico: nunca deve retornar Null e sempre deve retornar a mesma questão "UnHit"
            const numberOfTests = totalQuestions * 50
            for (let i = 0; i < numberOfTests; i++) {
                const nextQuestion = game.nextQuestion()
                expect(nextQuestion).not.toBeNull()
                expect(nextQuestion?.isHit()).toBeFalsy()
                expect(nextQuestion?.getId()).toEqual(unHitQuestion.getId())
            }
        })

        it('should return random question, that is, it should output a minimum of different question orders, given the number of questions', () => {
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


    describe('getAnswers', () => {

        it('should contain a Answer List', () => {
            expect(game.getAnswers()).toBeInstanceOf(Array);
        });


        it('Question List and Answer List should have same size', () => {
            expect(game.getQuestions().length).toBe(game.getAnswers().length)
        });

    })

    describe('currentQuestion', () => {

        it('...', () => {
            expect(true).toBeTruthy()
        });

    })


    describe('isOver', () => {

        it('...', () => {
            expect(true).toBeTruthy()
        });

    })


})


function factorial(n: number): number {
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}