'use client'

import { useState, useEffect } from "react"
import { Country, Flag, GeoItem, TriviaProps } from "../types"
import { shuffleArray } from "../utils";
import { GeoLocation } from "../core/GeoLocation";
import { GeoItemDataSource } from "../services/geoItemDataSource";
import { Trivia } from "../core/Trivia";

// Isso é basicamente uma classe... aff, pra que complicar?

export const GameManager = () => {

    const triviaProps: TriviaProps = {
        location: GeoLocation.LATIN_AMERICA,
        geoItemService: new GeoItemDataSource()
    }

    const [score, setScore] = useState<number>(0)
    const [retry, setRetry] = useState<number>(0)
    const [game, setGame] = useState<boolean>(true)

    const [countries, setCountries] = useState<Array<Country>>()
    const [flags, setFlags] = useState<Array<Flag>>()
    const [currentCountry, setCurrentCountry] = useState<Country>()


    const initializeGame = () => {
        const trivia: Trivia = new Trivia(triviaProps)
        const newCountries = trivia.getCountries()
        const newFlags = trivia.getFlags()
        return {newCountries, newFlags}
    }


    const nextQuestion = () => {
        const updatedCountries = [...countries]
        const currentCountry = updatedCountries.pop()
        setCurrentCountry(currentCountry);
        setCountries(updatedCountries)
        if (!currentCountry || currentCountry == undefined) {
            setGame(false)
        } 
    }

    const resetGame = () => {
        const {newCountries, newFlags} = initializeGame();
        setFlags(newFlags)        
        const currentQuestion = newCountries.pop()
        setCurrentCountry(currentQuestion);
        setCountries(newCountries)
        setScore(0)
        setRetry(0)
        setGame(true)
    }


    // Definir primeira pergunta no início do jogo
    useEffect(() => {
        const {newCountries, newFlags} = initializeGame();
        setFlags(newFlags)        
        const currentQuestion = newCountries.pop()
        setCurrentCountry(currentQuestion);
        setCountries(newCountries)
    }, []);

    
    const checkAnswer = (index: number) => {
        const selectedAnswer = flags[index]
        if (selectedAnswer.country_id === currentCountry?.id) {

            const updatedAnswers = [...flags]
            updatedAnswers.splice(index, 1)
            setFlags(updatedAnswers)

            const updatedScore = score + 1
            setScore(updatedScore)

            nextQuestion()
        }
    }


    return { score, retry, currentQuestion: currentCountry, answers: flags, game, checkAnswer, resetGame };

}