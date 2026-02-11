import Image from 'next/image';
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
                    <Image 
                        src={flag.getImage()} 
                        className="card-img-top" 
                        alt={flag.getImage()}
                        fill
                        style={{objectFit: 'cover'}}
                    />
                </div>
                <div className="card-body">
                    <p className="card-text">{flag.getText()}</p>
                </div>
            </div>
        </div>
    );

}