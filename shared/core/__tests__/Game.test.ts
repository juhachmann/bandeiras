import { GameAdapterMock } from "@/__dev__/GameAdapterMock";
import { gameConfigMock } from "@/__dev__/GameConfigMock";
import { factorial } from "@/utils";
import { GameSessionLoader, IGame, IQuestion } from "../IGame";
import { EmptyGameAdapterMock } from "@/__dev__/EmptyGameAdapter";
import { Question } from "../Question";
import { Answer } from "../Answer";

describe('Game', () => {

    const gameAdapter = new GameAdapterMock()
    const emptyGameAdapter = new EmptyGameAdapterMock()
    const gameConfig = gameConfigMock

    let game : IGame

    beforeEach(async () => {
        const gameSession = await GameSessionLoader.createNew(gameAdapter, gameConfig)
        game = gameSession.getGame()
        //game = new Game(gameConfig, geoItems)
    });

    afterEach(() => {
        jest.restoreAllMocks()
    })

    describe('getQuestions', () => {

        it('should contain a Question List', () => {
            const questions = game.getQuestions()
            expect(questions).toBeInstanceOf(Array);
            questions.forEach(q => expect(q).toBeInstanceOf(Question))
        })

        it('should return empty list when geoItem data is empty', async () => {
            const gameSession = await GameSessionLoader.createNew(emptyGameAdapter, gameConfig)
            const emptyGame = gameSession.getGame()
            expect(emptyGame.getQuestions().length).toBe(0)
        })

        it('should NOT return empty list when geoItem data is NOT empty', () => {
            expect(game.getQuestions().length).toBeGreaterThan(0)        
        })

        it('two lists should have the same elements given the same GameConfig', async () => {
            const gameSessionA = await GameSessionLoader.createNew(gameAdapter, gameConfig)
            const gameA = gameSessionA.getGame()

            const gameSessionB = await GameSessionLoader.createNew(gameAdapter, gameConfig)
            const gameB = gameSessionB.getGame()

            expect(gameA.getQuestions().length).toBe(gameB.getQuestions().length)

            const setA = new Set(gameA.getQuestions().map(item => JSON.stringify(item)))
            const setB = new Set(gameB.getQuestions().map(item => JSON.stringify(item)))

            expect(setA.size).toBe(setB.size)
            expect([...setA].every(item => setA.has(item))).toBeTruthy()        
        })

        // É um teste probabilístico e, às vezes, ele falha...
        it('multiple lists should be outputed with a minimum of different orders, given the number of geoitem elements', async () => {
            const totalElements = game.getQuestions().length
                
            const totalCombinations = factorial(totalElements)
            const desiredCoverage = 0.6  // 60% das combinações
            const expectedUnique = Math.floor(totalCombinations * desiredCoverage)
            const numTests = Math.ceil(totalCombinations * 2)  // 2x para boa cobertura

            const results = new Set();
            for (let i = 0; i < numTests; i++) {
                const gameSession = await GameSessionLoader.createNew(gameAdapter, gameConfig)
                const game = gameSession.getGame()
                results.add(JSON.stringify(game.getQuestions()))
            }            
            expect(results.size).toBeGreaterThan(expectedUnique)
        })

        it('should create Questions with same GeoLocation as of gameConfig', () => {
            const questions = game.getQuestions()
            questions.forEach(q => expect(q.getGeoLocation()).toEqual(gameConfig.location))
        });


        it('should create Questions with same Type as of gameConfig', () => {
            const questions = game.getQuestions()
            questions.forEach(q => expect(q.getType()).toEqual(gameConfig.gameType))
        });

        
    });

    describe('getAnswers', () => {

        it('should contain an Answer List', () => {
            const answers = game.getAnswers()
            expect(answers).toBeInstanceOf(Array);
            answers.forEach(q => expect(q).toBeInstanceOf(Answer))
        })

        it('should be empty if geoItems is empty', async () => {
            const gameSession = await GameSessionLoader.createNew(emptyGameAdapter, gameConfig)
            const emptyGame = gameSession.getGame()
            expect(emptyGame.getAnswers().length).toEqual(0) 
        });

        it('should have same size as getQuestions', () => {
            const questionsLenght = game.getQuestions().length
            expect(game.getAnswers().length).toEqual(questionsLenght)            
        });
        
    });


    describe('getCurrentQuestion', () => {

        it('should be null, given that geoItems is empty', async () => {
            const gameSession = await GameSessionLoader.createNew(emptyGameAdapter, gameConfig)
            const emptyGame = gameSession.getGame()
            expect(emptyGame.getCurrentQuestion()).toBeNull()             
        });

        it('should return question, given that geoItem is not empty', () => {
            expect(game.getCurrentQuestion()).toBeInstanceOf(Question)
        });

        // Teste probabilístico
        it('should return same question, given that game.nextQuestion is not called', () => {
            const currentQuestion = game.getCurrentQuestion()
            const numberOfQuestions = game.getQuestions().length
            const numberOfTests = numberOfQuestions * 60
            for (let i = 0; i < numberOfTests; i++) {
                expect(game.getCurrentQuestion()).toBe(currentQuestion)
            }
        });

        // Teste probabilístico (por que NextQuestion retorna random)
        it('should return same question as returned by game.NextQuestion', () => {
            const nextQuestion = game.nextQuestion()
            expect(game.getCurrentQuestion()).toBe(nextQuestion)
        });
        
    });



    describe('nextQuestion', () => {

        it('should return null, given that geoItem is empty', async () => {
            const gameSession = await GameSessionLoader.createNew(emptyGameAdapter, gameConfig)
            const emptyGame = gameSession.getGame()

            const numberOfAttempts = 100
            for (let i = 0; i < numberOfAttempts; i++) {
                expect(emptyGame.nextQuestion()).toBeNull()
            }
            
        });

        // Estes testes não são determinísticos
        // Para testes determinísticos, ver testes de unidade para os métodos da classe: QuestionFactory
        it('should not return question whose property hit is true', () => {
            
            const questionHit : IQuestion = game.getCurrentQuestion()!
                        
            // Mock do método isHit() de questionHit
            // Mas funciona em qq lugar?
            jest.spyOn(questionHit, 'isHit').mockReturnValue(true)

            expect(questionHit.isHit()).toBeTruthy()

            expect(game.getQuestions().filter(question => question.isHit()).map(q => q.getId())).toEqual([questionHit.getId()])

            // Teste probabilístico
            const totalQuestions = game.getQuestions().length
            const numberOfTests = totalQuestions * 100
            for (let i = 0; i < numberOfTests; i++) {
                const nextQuestion = game.nextQuestion()!
                console.log(nextQuestion);
                console.log(questionHit);               
                expect(nextQuestion.getId()).not.toBe(questionHit.getId())
            }

        })

        it('should return null if all Questions are already hit', () => {
            
            const gameQuestions = game.getQuestions()

            const totalQuestions = gameQuestions.length
            expect(totalQuestions).toBeGreaterThan(0)

            // Mock Question.isHit()
            jest.spyOn(Question.prototype, 'isHit').mockReturnValue(true)

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

            const unHitQuestion = game.getCurrentQuestion()!
            const unHitId = unHitQuestion.getId()

            // Mock com lógica condicional
            jest.spyOn(Question.prototype, 'isHit').mockImplementation(function() {
                return this.getId() !== unHitId
            })

            // Validações
            const unHitQuestionList = gameQuestions.filter(q => !q.isHit())
            expect(unHitQuestionList.length).toBe(1)
            expect(unHitQuestionList[0].getId()).toBe(unHitId)

            // Teste probabilístico
            const numberOfTests = totalQuestions * 50
            for (let i = 0; i < numberOfTests; i++) {
                const nextQuestion = game.nextQuestion()
                expect(nextQuestion).not.toBeNull()
                expect(nextQuestion?.getId()).toEqual(unHitId)
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

    
});