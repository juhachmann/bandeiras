'use client'

interface GameLayoutProps {
  title: string;
  score: number;
  onReset: () => void;
  question: string;
  game: boolean;
  children: React.ReactNode;
}

export default function GameLayout({ title, score, onReset, question, game, children }: GameLayoutProps) {
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
                <h4 className="text-dark bg-light p-3 rounded">{question}</h4>
              </div>
            </div>

            {/* Cards para imagens */}
            <div className="row g-3 justify-content-center">
              {children}
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