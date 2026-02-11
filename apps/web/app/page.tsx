'use client'

import { useGameManager } from "@/src/hooks/useGameManager";
import GameLayout from '@/src/components/GameLayout';
import FlagCards from "@/src/components/FlagCards";

export default function Home() {  

    const { answers, game, checkAnswer, currentQuestion, resetGame, score } = useGameManager();

    return (  
        <GameLayout 
            title={"Trivia Game"} 
            score={score} 
            onReset={resetGame} 
            game={game}
            question={`País: ${currentQuestion?.getText()}`}
        > 
            { answers?.map((answer, index) => (
                <FlagCards
                    key={answer.getId()}
                    flag={answer}
                    index={Number(answer.getId())}
                    disabled={false}
                    hit={false}
                    miss={false}
                    checkAnswer={checkAnswer}
                />
            ) ) }
        </GameLayout>
    );

};