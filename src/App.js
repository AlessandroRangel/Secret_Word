import './App.css';

import { useCallback, useEffect, useState } from 'react';

import {wordsList} from './data/words';

import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stage = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
]
function App() {
  const guessesQtd = 3;

  const [gameStage, setStage] = useState(stage[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQtd);
  const [score, setScore] = useState(0);

 
  
  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random()* Object.keys(categories).length)];

    const word = words[category][Math.floor(Math.random() * Object.keys(words).length)];
    return {word, category};
  },[words]);
  const startGame = useCallback(() => {
    clearLetterState();
    const {word, category} = pickWordAndCategory();

    let wordLetters = word.split('');
    wordLetters = wordLetters.map((l) => l.toLowerCase());
    

    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);
    setStage(stage[1].name);
  }, [pickWordAndCategory]);
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      return;
    }

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    }else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])
      setGuesses((actualGuesses) => actualGuesses -1)
    }
    
  }

  const clearLetterState = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }
  useEffect(() => {
    if(guesses <= 0) {
      clearLetterState();
      setStage(stage[2].name);
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];
    
    if(guessedLetters.length === uniqueLetters.length) {
      setScore((actualScore) => actualScore += 100);
      startGame();
    }
    
  }, [guessedLetters, letters, startGame]);

  const retry = () => {
    setScore(0);
    setGuesses(guessesQtd);
    setStage(stage[0].name);
  }

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && <Game 
      verifyLetter={verifyLetter} 
      pickedWord={pickedWord} 
      pickedCategory={pickedCategory} 
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
      />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
