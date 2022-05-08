import React, { useEffect,useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';
import Tooltip from './Tooltip';

export default function Wordle({solution,wordsList}) {
    const { currentGuess, handleKeyUp, guesses, isCorrect, turn, usedKeys,showTooltip } = useWordle(solution,wordsList);
    const [showModal, setShowModal] = useState(false);
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);

        if (isCorrect) {
            setTimeout(()=>setShowModal(true),2000);
            window.removeEventListener('keyup', handleKeyUp)
        }

        if (turn > 5) {
            setTimeout(()=>setShowModal(true),2000);
            window.removeEventListener('keyup', handleKeyUp)
        }

        return () => window.removeEventListener('keyup', handleKeyUp);
    },[handleKeyUp,isCorrect,turn]);

    const hintHandler = (showHint) => {
        setShowHint(showHint);
    }

    return (
        <React.Fragment>
            <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} isInvalid={showTooltip.error}/>
            <Keypad handleKeyUp={showModal ? null : handleKeyUp} usedKeys={usedKeys}/>
            {(showModal || showHint) && <Modal isCorrect={isCorrect} turn={turn} solution={solution} showHint={showHint} hintHandler={hintHandler}/>}
            {showTooltip.error && <Tooltip message={showTooltip.message}/>}
            <div className="hint-wrp" onClick={hintHandler.bind(this, true)}><img src={process.env.PUBLIC_URL+"/hint.png"} alt="Hint"/></div>
        </React.Fragment>
    )
}
