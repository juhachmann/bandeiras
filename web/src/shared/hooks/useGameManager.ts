'use client'

import { useCallback, useState, useEffect } from "react"
import { Flag, GeoItem } from "../types"
import { getFlags } from "../services/geoItemService"
import { randomize } from "../utils";

// Isso é basicamente uma classe... aff, pra que complicar?

export const GameManager = () => {

    const [score, setScore] = useState<number>(0)
    const [retry, setRetry] = useState<number>(0)
    const [game, setGame] = useState<boolean>(true)

    const [questions, setQuestions] = useState<Array<GeoItem>>()
    const [answers, setAnswers] = useState<Array<GeoItem>>()
    const [currentQuestion, setCurrentQuestion] = useState<GeoItem>()


    const initializeGame = () => {
        const geoItems : Array<GeoItem> = getFlags()
        const shuffledQuestions = randomize(geoItems)
        const shuffledAnswers = randomize(geoItems)
        return {shuffledQuestions, shuffledAnswers}
    }


    const nextQuestion = () => {
        const updatedQuestions = [...questions]
        const currentQuestion = updatedQuestions.pop()
        setCurrentQuestion(currentQuestion);
        setQuestions(updatedQuestions)
        if (!currentQuestion || currentQuestion == undefined) {
            setGame(false)
        } 
    }

    const resetGame = () => {
        const { shuffledQuestions, shuffledAnswers } = initializeGame();
        setAnswers(shuffledAnswers)        
        const currentQuestion = shuffledQuestions.pop()
        setCurrentQuestion(currentQuestion);
        setQuestions(shuffledQuestions)
        setScore(0)
        setRetry(0)
        setGame(true)
    }


    // Definir primeira pergunta no início do jogo
    useEffect(() => {
        const { shuffledQuestions, shuffledAnswers } = initializeGame();
        setAnswers(shuffledAnswers)        
        const currentQuestion = shuffledQuestions.pop()
        setCurrentQuestion(currentQuestion);
        setQuestions(shuffledQuestions)
    }, []);

    
    const checkAnswer = (index: number) => {
        const selectedAnswer = answers[index]
        if (selectedAnswer.flag.country_id === currentQuestion?.country.id) {

            const updatedAnswers = [...answers]
            updatedAnswers.splice(index, 1)
            setAnswers(updatedAnswers)

            const updatedScore = score + 1
            setScore(updatedScore)

            nextQuestion()
        }
    }


    return { score, retry, currentQuestion, answers, game, checkAnswer, resetGame };

}