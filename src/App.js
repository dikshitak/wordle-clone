import { useEffect, useState } from "react";
import axios from 'axios';
import Wordle from "./components/Wordle";
import qs from 'qs';

const App = () => {

  const [solutionDetails, setSolutionDetails] = useState({});

  const [wordsList, setWordsList] = useState([]);

  useEffect(() => {
    const optionsAllWords = {
      method: 'GET',
      url: 'https://wordsapiv1.p.rapidapi.com/words/',
      params: {letters: '5', limit: '1320', partOfSpeech: 'verb', letterPattern: '^[a-zA-Z]*$'},
      headers: {
        'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
      },
      paramsSerializer: function(params) {
        return qs.stringify(params, { encode: false }); // param=value1&param=value2
      }
    };
    axios.request(optionsAllWords).then(function (response) {
      setWordsList(response.data.results.data);
    }).catch(function (error) {
      console.error(error);
    });

    const optionsWord = {
      method: 'GET',
      url: 'https://wordsapiv1.p.rapidapi.com/words/',
      params: {letters: '5', limit: '1', partOfSpeech: 'verb', random: true},
      headers: {
        'X-RapidAPI-Host': process.env.REACT_APP_API_HOST,
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
      },
    };
    axios.request(optionsWord).then(function (response) {
      setSolutionDetails(response.data);
    }).catch(function (error) {
      console.error(error);
    });
    
  },[]);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {solutionDetails.word && <Wordle solution={solutionDetails} wordsList={wordsList}/>}
    </div>
  );
}

export default App;
