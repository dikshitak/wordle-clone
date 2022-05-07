import { useState } from "react"

const useWordle = (solution) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]); // guess is formatted with color code
    const [history, setHistory] = useState([]); // guess is a string to check repetition of words
    const [isCorrect, setIsCorrect] = useState(false);

    const formatGuess = () => {
        console.log('formatting');

        const solutionLetters = [...solution.word];
        const formattedGuess = [...currentGuess].map((letter) => {
            return { key: letter, color: 'grey'}
        });
        // For correct letters with correct position
        formattedGuess.forEach((letter,index) => {
            if(solutionLetters[index] === letter.key) {
                formattedGuess[index].color = 'green';
                solutionLetters[index] = null;
            }
        });
        // For correct letters with incorrect position
        formattedGuess.forEach((letter,index) => {
            if(solutionLetters.includes(letter.key) && letter.color!=='green') {
                formattedGuess[index].color = 'yellow';
                solutionLetters[solutionLetters.indexOf(letter.key)] = null;
            }
        });

        return formattedGuess;
    }

    const addNewGuess = (formattedGuess) => {
        if(currentGuess===solution) {
            setIsCorrect(true);
        }
        setGuesses((prevGuesses) => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = formattedGuess;
            return newGuesses;
        });
        setHistory((prevHistory) => {
            return [...prevHistory,currentGuess];
        });
        setTurn((prevTurn) => {
            return prevTurn+1;
        });
        setCurrentGuess('');
    }

    const handleKeyUp = ({key}) => {

        console.log(key);

        if(key==='Enter') {
            if(turn > 5) {
                return;
            }
            if(history.includes(currentGuess)) {
                return;
            }
            if(currentGuess.length!=5) {
                return;
            }
            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if(key==='Backspace' || key==='Delete') {
            setCurrentGuess((prevState) => {
                return prevState.slice(0,-1);
            });
            return;
        }

        if(/^[a-zA-Z]$/.test(key)) {
            if(currentGuess.length < 5) {
                setCurrentGuess((prevState) => {
                    return prevState+key;
                });
            }
        }
    }

    return {turn,currentGuess,guesses,isCorrect,handleKeyUp}
}

export default useWordle