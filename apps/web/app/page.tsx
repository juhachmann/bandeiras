'use client'

import { useGameManager } from "@/src/hooks/useGameManager";
import GameLayout from '@/src/components/GameLayout';
import FlagCards from "@/src/components/FlagCards";
import { useEffect, useState } from "react";

export default function Home() {  

    const { questions, game, checkAnswer, currentQuestion, resetGame, score, attempts } = useGameManager();

    return (  
        <GameLayout 
            title={"Trivia Game"} 
            score={score} 
            onReset={resetGame} 
            game={game}
            question={`País: ${currentQuestion?.getText()}`}
        > 
            { questions?.map((question, index) => (
                <FlagCards
                    key={question.getAnswer().getId()}
                    flag={question.getAnswer()}
                    index={Number(question.getAnswer().getId())}
                    isHit={question.isHit()}
                    attempts={question.getAttempts()}
                    checkAnswer={checkAnswer}
                />
            ) ) }
        </GameLayout>
    );

};