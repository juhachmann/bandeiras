'use client'

import { useState, useEffect } from "react"
import { GeoLocation, GameConfig, GameSessionLoader, GameType, IAnswer, IGameAdapter, IGameSession, IGeoItemRepository, IQuestion } from "@flags/game";
import { GeoItemLocalService } from "../services/GeoItemLocalService";
import { Answer, Question } from "../type/game";


export const GameManager = () => {
  
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
    const [answers, setAnswers] = useState<Array<IAnswer>>()
    const [currentQuestion, setCurrentQuestion] = useState<IQuestion>()

    // const [countries, setCountries] = useState<Array<IQuestion>>()
    const [flags, setFlags] = useState<Array<Answer>>()
    const [currentCountry, setCurrentCountry] = useState<Question>()

    const [gameSession, setGameSession] = useState<IGameSession>()

    const mapToQuestion = (question: IQuestion) : Question => {
        return {
            id: question.getId(),
            answer: undefined,
            text: question.getText(),
            geolocation: question.getGeoLocation(),
            type: question.getType(),
            isHit: question.isHit(),
            attempts: question.getAttempts()
        }
    }

    const mapToAnswer = (answer : IAnswer) : Answer => {
        return {
            id: answer.getId(),
            text: answer.getText(),
            allMatched: answer.getAllMatched()
        }
    }

    const initializeGame = async () => {
       
        const newGameSession : IGameSession = await GameSessionLoader.createNew(gameAdapter, gameConfig)
        setGameSession(newGameSession)

        const newCurrentQuestion = newGameSession.getGame().getCurrentQuestion()
        
        if (!newCurrentQuestion) {
            setGame(false)
            return 
        }

        setCurrentQuestion(newCurrentQuestion)
        setCurrentCountry(mapToQuestion(newCurrentQuestion))
        setGame(true)

        const newAnswers = newGameSession.getGame().getAnswers()   
        setAnswers(newAnswers)

        const newFlags = newAnswers.map(a => mapToAnswer(a))
        setFlags(newFlags)

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

        setCurrentCountry(mapToQuestion(newCurrentQuestion))
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

    
    const checkAnswer = (index: number) => {
        if (!flags || !answers || !currentQuestion) {
            return
        }

        const selectedAnswer = flags[index]

        const selectedGameAnswer = answers.find(a => a.getId() == selectedAnswer.id)

        if (!selectedGameAnswer) {
            throw new Error("Invalid Answer Id")
        }

        const isCorrect = currentQuestion.attempt(selectedGameAnswer)

        if (isCorrect) {
            const updatedAnswers = [...flags]
            updatedAnswers.splice(index, 1)
            setFlags(updatedAnswers)

            const updatedScore = score + 1
            setScore(updatedScore)

            setNextQuestion()
        }

    }

    return { score, retry, currentQuestion: currentCountry, answers: flags, game, checkAnswer, resetGame };

}