'use client'

import { useState, useEffect } from "react"
import { GameConfig, GameSessionLoader, GameType, IFlagItemRepository, IGameAdapter, IGameSession } from "@flags/game";
import { FlagItemLocalService } from "../services/FlagItemLocalService";
import { Answer, Question } from "../types/game";


export const useGameManager = () => {
  
    const gameConfig : GameConfig = {
        gameType: GameType.FLAGS,
        filter: []
    }

    const flagItemService : IFlagItemRepository = new FlagItemLocalService()

    const gameAdapter : IGameAdapter = {
        getFlagItemRepository: function (): IFlagItemRepository {
            return flagItemService
        }
    }

    const [score, setScore] = useState<number>(0)
    const [retry, setRetry] = useState<number>(0)
    const [game, setGame] = useState<boolean>(false)
    const [attempts, setAttempts] = useState<number>(0)


    const [questions, setQuestions] = useState<Array<Question>>()
    // const [answers, setAnswers] = useState<Array<Answer>>()
    // const [selectedAnswer, setSelectedAnswer] = useState<IAnswer>()
    const [currentQuestion, setCurrentQuestion] = useState<Question>()

    // const [countries, setCountries] = useState<Array<IQuestion>>()
    // const [flags, setFlags] = useState<Array<Answer>>()
    // const [currentCountry, setCurrentCountry] = useState<IQuestion>()

    const [gameSession, setGameSession] = useState<IGameSession>()

    const initializeGame = async () => {
       
        const newGameSession : IGameSession = await GameSessionLoader.createNew(gameAdapter, gameConfig)
        setGameSession(newGameSession)

        const newCurrentQuestion = newGameSession.getGame().getCurrentQuestion()
        
        if (!newCurrentQuestion) {
            setGame(false)
            return 
        }
        setCurrentQuestion(newCurrentQuestion)
        // setCurrentCountry(mapToQuestion(newCurrentQuestion))
        setGame(true)

        const newQuestions = newGameSession.getGame().getQuestions()
        setQuestions(newQuestions)

        setAttempts(newCurrentQuestion.getAttempts())

        // const newAnswers = newGameSession.getGame().getAnswers() 
        // setAnswers(newAnswers)

        // const newFlags = newAnswers.map(a => mapToAnswer(a))
                
        // setFlags(newFlags)

    }


    const setNextQuestion = () => {

        if (!gameSession) {
            return false
        }

        const newCurrentQuestion = gameSession.getGame().nextQuestion()
        
        if (newCurrentQuestion == null) {
            setGame(false)
            return
        }

        setCurrentQuestion(newCurrentQuestion)
        setAttempts(newCurrentQuestion.getAttempts())

        // setCurrentCountry(mapToQuestion(newCurrentQuestion))        
    }

    const resetGame = async () => {
        await initializeGame();
        setScore(0)
        setRetry(0)
    }


    // Definir primeira pergunta no início do jogo
    useEffect(() => {
        const initialize = async () => {
            await resetGame() 
        }
        initialize()        
    }, []);

    
    const checkAnswer = (answer: Answer) : boolean => {

        console.log("Selected Answer: ");
        console.log(answer);       

        if (
            // !flags || 
            !questions || !currentQuestion) {
            return
        }

        const isCorrect = currentQuestion.attempt(answer)
        setAttempts(currentQuestion.getAttempts())
        

        if (isCorrect) {
            // TODO: usar a propriedade allMatched de Answer
            // const previousAnswers = [...flags]
            // const previousAnswers = [...answers]

            // const updatedAnswers = previousAnswers.filter(a => a != answer)
            
            // // setFlags(updatedAnswers)
            // setAnswers(updatedAnswers)


            // const previousQuestions = [...questions]

            // const updatedQuestions = previousQuestions.filter(q => q != currentQuestion)
            
            // // setFlags(updatedAnswers)
            // setQuestions(updatedQuestions)

            const updatedScore = score + 1
            setScore(updatedScore)

            setNextQuestion()
        }

        return isCorrect

    }

    return { score, retry, 
        // currentQuestion: currentCountry, 
        currentQuestion,
        attempts,
        // answers: flags, 
        questions, 
        game, checkAnswer, resetGame };

}