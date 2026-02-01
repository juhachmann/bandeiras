import { GameAdapterMock } from "@/__dev__/GameAdapterMock";
import { Answer } from "../Answer"
import { GameAdapter } from "../GameAdapter";
import { Question } from "../Question"
import { EmptyGameAdapterMock } from "@/__dev__/EmptyGameAdapter";
import { Difficulty, GameConfig, GameType, GeoLocation } from "@/types/GameConfig";
import { Game } from "../Game";


describe('Question', () => {

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
    

    describe('Attempt', () => {

        let question : Question
        let correctAnswer : Answer
        let incorrectAnswer : Answer

        beforeEach(() => {
            question = game.getQuestions()[0]
            correctAnswer = question.getAnswer()
            incorrectAnswer = game.getQuestions()[1].getAnswer()            
        });

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

