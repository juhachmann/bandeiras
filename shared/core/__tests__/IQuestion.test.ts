import { IAnswer, IQuestion } from "../IGame";
import { getLatinAmericaFlagGame } from "@/__dev__/GameFactoryMock";


describe('IQuestion', () => {
  
    let question : IQuestion
    let correctAnswer : IAnswer
    let incorrectAnswer : IAnswer
  
    beforeEach(async () => {
        const game = await getLatinAmericaFlagGame()
        const questions = game.getQuestions()
        if (questions.length >= 2) {
            question = questions[0]
            correctAnswer = question.getAnswer()
            incorrectAnswer = questions[1].getAnswer()
        } else {
            throw new Error("Jogo precisa ter ao menos duas questões para teste");            
        }

    });

    afterEach(() => {
        jest.restoreAllMocks()
    })   

    describe('attempt', () => {

        it('should set question property hit to true if answer is correct', () => {
            question.attempt(correctAnswer)
            expect(question.isHit()).toBeTruthy()
        });

        it('should keep question property hit false if answer is incorrect', () => {
            question.attempt(incorrectAnswer)
            expect(question.isHit()).toBeFalsy()            
        });

        it('should increase number of attempts if question property hit is false and answer is incorrect', () => {
            expect(question.getAttempts()).toBe(0)
            expect(question.isHit()).toBeFalsy()
            const numberOfAttempts = 3
            let resultQuestion = question
            for (let index = 0; index < numberOfAttempts; index++) {
                question.attempt(incorrectAnswer)
            }
            expect(resultQuestion.isHit()).toBeFalsy()
            expect(resultQuestion.getAttempts()).toBe(numberOfAttempts)
        });

        it('should increase number of attempts if question property hit is false and answer is correct', () => {
            expect(question.getAttempts()).toBe(0)
            expect(question.isHit()).toBeFalsy()
            const numberOfAttempts = 1
            question.attempt(correctAnswer)
            expect(question.getAttempts()).toBe(numberOfAttempts)
        });

        it('should never increase number of attempts if question hit is already true', () => {
            expect(question.isHit()).toBeFalsy()
            expect(question.getAttempts()).toEqual(0)

            // Hit
            question.attempt(correctAnswer)
            expect(question.isHit()).toBeTruthy()
            expect(question.getAttempts()).toEqual(1)

            const attempstAfterHit = 10

            // Tanto faz se a resposta é correta ou incorreta
            // Não deve mudar de hit pra UnHit, mesmo se marca incorreta
            question.attempt(correctAnswer)
            for (let index = 0; index < attempstAfterHit; index++) {
                question.attempt(incorrectAnswer)
            } 

            expect(question.isHit()).toBeTruthy()
            expect(question.getAttempts()).toEqual(1)
        });

    })

})

