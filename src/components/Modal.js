import React from 'react'

export default function Modal({ isCorrect, solution, turn, showHint, hintHandler }) {

    const hideHintHandler = () => {
        hintHandler(false);
    }
    return (
        <div className="modal">
            <div>
                {showHint && <div className="close-modal" onClick={hideHintHandler}>X</div>}
                {isCorrect && !showHint && (
                    <React.Fragment>
                        <h1>You Win!</h1>
                        <p className="solution">{solution.word}</p>
                        <p>You found the solution in {turn} guesses :)</p>
                    </React.Fragment>
                )}
                {!isCorrect && !showHint && (
                    <React.Fragment>
                        <h1>Nevermind</h1>
                        <p className="solution">{solution.word}</p>
                        <p>Better luck next time :)</p>
                    </React.Fragment>
                )}
                <div className="definition">
                    <p>Definition</p>
                    <ul>
                        {solution.results.map((r,i) => {
                            return <li key={i}>{r.definition} <span>{`${r.synonyms ? `(Synonyms: ${r.synonyms})` : ''}`}</span></li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    ) 
}
