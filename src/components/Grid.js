import React from 'react'
import Row from './Row'

export default function Grid({currentGuess, guesses, turn, isInvalid}) {
  return (
    <div>
      {guesses.map((g,i) => {
        if(turn === i) {
          return <Row key={i} guess={g} currentGuess={currentGuess} isInvalid={isInvalid}/>
        }
        return <Row key={i} guess={g}/>
      })}
    </div>
  )
}
