import { useState } from "react"

const useWordle = (solution,wordsList) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([...Array(6)]); // guess is formatted with color code
    const [history, setHistory] = useState([]); // guess is a string to check repetition of words
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState({});
    const [showTooltip, setToolTip] = useState({error:false,message:''});

    const formatGuess = () => {

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
        if(currentGuess===solution.word) {
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
        setUsedKeys((prevUsedKeys)=>{
            formattedGuess.forEach((letter,index) => {
                let currentColor = prevUsedKeys[letter.key];
                if(letter.color === 'green') {
                    prevUsedKeys[letter.key] = 'green';
                    return;
                }
                if(letter.color === 'yellow' && currentColor !== 'green')  {
                    prevUsedKeys[letter.key] = 'yellow';
                    return;
                }
                if(letter.color === 'grey' && currentColor !== ('green' || 'yellow'))  {
                    prevUsedKeys[letter.key] = 'grey';
                    return;
                }
            });
            return prevUsedKeys;
        });
        setCurrentGuess('');
    }

    const handleKeyUp = ({key}) => {

        if(key==='Enter') {
            if(turn > 5) {
                setToolTip({error:true, message: 'Start a new game'});
                setTimeout(()=> {
                    setToolTip({error:false, message: ''});
                },1000);
                return;
            }
            if(history.includes(currentGuess)) {
                setToolTip({error:true,message: 'Repitition of words not allowed'});
                setTimeout(()=> {
                    setToolTip({error:false, message: ''});
                },1000);
                return;
            }
            if(currentGuess.length!==5) {
                setToolTip({error:true,message: 'Not enough letters'});
                setTimeout(()=> {
                    setToolTip({error:false, message: ''});
                },1000);
                return;
            }
            if(!wordsList.includes(currentGuess)) {
                setToolTip({error:true,message: 'Enter valid 5 letter verb'});
                setTimeout(()=> {
                    setToolTip({error:false, message: ''});
                },1000);
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

    return {turn,currentGuess,guesses,isCorrect,handleKeyUp,usedKeys,showTooltip}
}

export default useWordle