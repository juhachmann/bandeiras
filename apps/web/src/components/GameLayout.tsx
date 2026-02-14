'use client'

import { useGameManager } from "../hooks/useGameManager";
import FlagCards from "./FlagCards";


export default function GameLayout() {
  
  const { questions, game, checkAnswer, currentQuestion, resetGame, score, attempts } = useGameManager();
  
  const title = "Trivia"
  const onReset = () => resetGame()

  return (
    <div className="container-fluid py-4">
      {/* Título da página */}
      <div className="row mb-4">
        <div className="col-12 text-center">
          <h1 className="display-4 text-primary">{title}</h1>
        </div>
      </div>

      {/* Score e Reset dividido em três */}
      <div className="row mb-4">
        <div className="col-8"></div>
        <div className="col-4 text-center">
          <button className="btn btn-danger" onClick={onReset}>
            Reset Game
          </button>
        </div>
      </div>

      {/* Área do jogo (se game estiver correndo) */}
      { game ? (
        <div className="row">
          <div className="col-12">
            {/* Pergunta */}
            <div className="row mb-4">
              <div className="col-12 text-center">
                <h4 className="text-dark bg-light p-3 rounded">{currentQuestion?.getText()}</h4>
              </div>
            </div>

            {/* Cards para imagens */}
            <div className="row g-3 justify-content-center">

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
            </div>
          </div>
        </div> 
      )
      : (
        <div className="row mb-4">
          <div className="col text-center">
            <h3 className="text-success">Score: {score}</h3>
          </div>
        </div>
      )
    }

    </div>
  );
}