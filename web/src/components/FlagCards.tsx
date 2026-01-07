import { Flag } from "@/src/shared/types";
import Image from 'next/image';

interface FlagCardsProps {
    flag: Flag;
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
                        src={flag.file} 
                        className="card-img-top" 
                        alt={flag.description}
                        fill
                        style={{objectFit: 'cover'}}
                    />
                </div>
                <div className="card-body">
                    <p className="card-text">{flag.description}</p>
                </div>
            </div>
        </div>
    );

}