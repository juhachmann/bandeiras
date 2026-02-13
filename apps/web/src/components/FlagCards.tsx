import { useEffect, useState } from 'react';
import { Answer } from '../types/game';
import styles from './FlagCards.module.css';

interface FlagCardsProps {
    readonly flag: Answer;
    readonly isHit: boolean;
    readonly attempts: number;
    readonly checkAnswer: (flag: Answer) => boolean;
    readonly index: number;
}


const borderColors = {
    great: 'success',
    good: 'warning',
    bad: 'danger',
    neutral: 'light-subtle'
}


// TODO: 
// Comportamentos: 
// A) Ficar piscar em vermelho se é a resposta certa e já teve 3 tentativas..
// B) "Animação" de ficar verde/amarela/vermelha ao ser a resposta correta selecionada, e, depois, ficar com opacidade

export default function FlagCards( { flag, attempts, isHit, checkAnswer, index } : FlagCardsProps) {


    const [isWrong, setIsWrong] = useState<boolean>(false)
    const [borderColor, setBorderColor] = useState<string>(borderColors.neutral)
    const [mustBlink, setMustBlink] = useState<boolean>(false)
    

    const resolveAttempt = (answer : Answer) => {
        const isCorrect = checkAnswer(answer)
        // Aqui podia setar pra mudar a borda dele né...
        if (!isCorrect) {
            setIsWrong(true)
        }
    }
    

    useEffect(() => {
        // Isso aqui tá disparando DUAS vezes na inicialização do componente (para tantas vezes quantas forem os cards)
        // E ele mesmo dispara a ação...
        console.log('Entrei no useEffect de isWrong!');
        
        if (isWrong) {
            console.log('Flag from ' + flag.getImage() + ' should blink in red');
            setBorderColor(borderColors.bad)
            setTimeout(() => {
                setIsWrong(false)
                setBorderColor(borderColors.neutral)
            }, 300)
        }
    }, [isWrong])


    // TODO: esses números são regra de negócio, precisam vir de outro lugar
    useEffect(() => {

        setMustBlink(false)
        
        if (attempts > 3) {
            setBorderColor(borderColors.bad + '-subtle')
        }
        
        else if (attempts > 1) {
            setBorderColor(borderColors.good + '-subtle')
        }

        else if (attempts == 1) {
            setBorderColor(borderColors.great + '-subtle')
        }

    }, [isHit])


    useEffect(() => {
        if (!isHit && attempts > 2) {
            setMustBlink(true)
        }
    }, [attempts])


    return (
        <div className="col-md-6 col-lg-3">
            <div>Must blink? {mustBlink ? "true" : "false"}</div>
            <div className={`card h-100 border border-${borderColor} ${mustBlink ? styles.blinkAnimation : ''} ${isHit ? 'opacity-20 pe-none' : ''}`} onClick={() => resolveAttempt(flag)} >
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