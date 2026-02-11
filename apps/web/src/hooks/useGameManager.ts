'use client'

import { useState, useEffect } from "react"
import { GeoLocation, GameConfig, GameSessionLoader, GameType, IGameAdapter, IGameSession, IGeoItemRepository } from "@flags/game";
import { GeoItemLocalService } from "../services/GeoItemLocalService";
import { Answer, Question } from "../types/game";


export const useGameManager = () => {
  
    const gameConfig : GameConfig = {
        gameType: GameType.FLAGS,
        location: GeoLocation.LATIN_AMERICA
    }

    const geoItemService : IGeoItemRepository = new GeoItemLocalService()

    const gameAdapter : IGameAdapter = {
        getGeoItemRepository: function (): IGeoItemRepository {
            return geoItemService
        }
    }

    const [score, setScore] = useState<number>(0)
    const [retry, setRetry] = useState<number>(0)
    const [game, setGame] = useState<boolean>(false)


    // const [questions, setQuestions] = useState<Array<IQuestion>>()
    const [answers, setAnswers] = useState<Array<Answer>>()
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

        const newAnswers = newGameSession.getGame().getAnswers() 
                  
        setAnswers(newAnswers)

        // const newFlags = newAnswers.map(a => mapToAnswer(a))
                
        // setFlags(newFlags)

    }


    const setNextQuestion = () : boolean => {

        if (!gameSession) {
            return false
        }

        const newCurrentQuestion = gameSession.getGame().nextQuestion()

        setCurrentQuestion(newCurrentQuestion)
        
        if (newCurrentQuestion == null) {
            setGame(false)
            return false
        }

        // setCurrentCountry(mapToQuestion(newCurrentQuestion))
        return true
        
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

    
    const checkAnswer = (answer: Answer) => {

        console.log("Selected Answer: ");
        console.log(answer);       

        if (
            // !flags || 
            !answers || !currentQuestion) {
            return
        }

        const isCorrect = currentQuestion.attempt(answer)

        if (isCorrect) {
            // TODO: usar a propriedade allMatched de Answer
            // const previousAnswers = [...flags]
            const previousAnswers = [...answers]

            const updatedAnswers = previousAnswers.filter(a => a != answer)
            
            // setFlags(updatedAnswers)
            setAnswers(updatedAnswers)

            const updatedScore = score + 1
            setScore(updatedScore)

            setNextQuestion()
        }

    }

    return { score, retry, 
        // currentQuestion: currentCountry, 
        currentQuestion,
        // answers: flags, 
        answers, 
        game, checkAnswer, resetGame };

}