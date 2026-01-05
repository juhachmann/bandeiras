'use client'

import { GameManager } from "@/src/shared/hooks/useGameManager";
import GameLayout from '../../src/web/components/GameLayout';
import FlagCards from "@/src/web/components/FlagCards";

export default function Game() {  

    const { answers, game, checkAnswer, currentQuestion, resetGame, score } = GameManager();

    return (  
        <GameLayout 
            title={"Trivia Game"} 
            score={score} 
            onReset={resetGame} 
            game={game}
            question={`País: ${currentQuestion?.country.name}`}
        > 
            { answers && answers.map((answer, index) => (
                <FlagCards
                    key={index}
                    flag={answer.flag}
                    index={index}
                    disabled={false}
                    hit={false}
                    miss={false}
                    checkAnswer={checkAnswer}
                />
            ) ) }
        </GameLayout>
    );

};