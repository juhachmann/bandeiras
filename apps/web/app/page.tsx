'use client'

import { GameManager } from "@/src/hooks/useGameManager";
import GameLayout from '@/src/components/GameLayout';
import FlagCards from "@/src/components/FlagCards";

export default function Home() {  

    const { answers, game, checkAnswer, currentQuestion, resetGame, score } = GameManager();

    return (  
        <GameLayout 
            title={"Trivia Game"} 
            score={score} 
            onReset={resetGame} 
            game={game}
            question={`País: ${currentQuestion?.text}`}
        > 
            { answers?.map((answer, index) => (
                <FlagCards
                    key={answer.id}
                    flag={answer}
                    index={Number(answer.id)}
                    disabled={false}
                    hit={false}
                    miss={false}
                    checkAnswer={checkAnswer}
                />
            ) ) }
        </GameLayout>
    );

};