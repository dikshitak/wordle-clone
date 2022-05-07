import { useEffect, useState } from "react";
import axios from 'axios';
import Wordle from "./components/Wordle";

const App = () => {

  const [solutionDetails, setSolutionDetails] = useState({"word":"knell","results":[{"definition":"make (bells) ring, often for the purposes of musical edification","partOfSpeech":"verb","synonyms":["ring"],"cause":["sound","go"],"typeOf":["sound"],"hasTypes":["toll"]},{"definition":"ring as in announcing death","partOfSpeech":"verb","typeOf":["ring","peal"]},{"definition":"the sound of a bell rung slowly to announce a death or a funeral or the end of something","partOfSpeech":"noun","typeOf":["bell","toll"]}],"syllables":{"count":1,"list":["knell"]},"pronunciation":{"all":"nɛl"},"frequency":2.27});

  // useEffect(() => {
  //   const options = {
  //     method: 'GET',
  //     url: 'https://wordsapiv1.p.rapidapi.com/words/',
  //     params: {letters: '5', limit: '1', page: '1', partOfSpeech: 'verb', random: true },
  //     headers: {
  //       'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
  //       'X-RapidAPI-Key': 'ff9ef72dc5mshb9f91c20477ba92p16008djsnb2ad5273ff9c'
  //     }
  //   };
    
  //   axios.request(options).then(function (response) {
  //     console.log(response.data);
  //     setSolutionDetails(response.data);
  //   }).catch(function (error) {
  //     console.error(error);
  //   });
    
  // },[]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solutionDetails.word && <Wordle solution={solutionDetails}/>}
    </div>
  );
}

export default App;
