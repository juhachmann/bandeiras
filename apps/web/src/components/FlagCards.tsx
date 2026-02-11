import { Answer } from '../types/game';

interface FlagCardsProps {
    flag: Answer;
    hit: boolean;
    miss: boolean;
    disabled: boolean;
    checkAnswer: (flag: Answer) => void;
    index: number;
}

export default function FlagCards( { flag, hit, miss, disabled, checkAnswer, index } : FlagCardsProps) {

    return (
        <div className="col-md-6 col-lg-3">

            <div className="card h-100" onClick={() => checkAnswer(flag)}>
                <div className="position-relative" style={{height: '200px'}}>
                    <span className={`fi fi-${flag.getIso31661().toLowerCase()}`} style={{fontSize: 'clamp(5rem, 15vw, 10rem)', textAlign: 'center'}}></span>
                </div>
                <div className="card-body">
                    <p className="card-text">{flag.getText()}</p>
                </div>
            </div>
        </div>
    );

}