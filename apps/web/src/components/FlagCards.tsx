import Image from 'next/image';
import { Answer } from '../type/game';

interface FlagCardsProps {
    flag: Answer;
    hit: boolean;
    miss: boolean;
    disabled: boolean;
    checkAnswer: (i: number) => void;
    index: number;
}

export default function FlagCards( { flag, hit, miss, disabled, checkAnswer, index } : FlagCardsProps) {

    return (
        <div className="col-md-6 col-lg-3">
            <div className="card h-100" onClick={() => checkAnswer(index)}>
                <div className="position-relative" style={{height: '200px'}}>
                    <Image 
                        src={flag.image} 
                        className="card-img-top" 
                        alt={flag.text}
                        fill
                        style={{objectFit: 'cover'}}
                    />
                </div>
                <div className="card-body">
                    <p className="card-text">{flag.text}</p>
                </div>
            </div>
        </div>
    );

}