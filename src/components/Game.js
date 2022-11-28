import { useState, useRef } from 'react';
import './Game.css'

const Game = ({
  verifyLetter, 
  pickedWord,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score  
}) => {
  const [letter, setLetter] = useState('');
  const letterInput = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);

    setLetter('');
    letterInput.current.focus();
  }
  return (
    <div className='game'>
     <p className='point'>
      <span>Pontuação: {score}</span>
     </p>
     <h1>Adivinhe a palavra: </h1>
     <h3 className='tip'>
      Dica sobre a Palavra: <span>{pickedCategory}</span>
     </h3>
     <p>Você tem {guesses} tentativas</p>
     <div className='wordConteiner'>
      {letters.map((letter, i) => (
        guessedLetters.includes(letter) ? (
          <span key={i} className='letter'>{letter}</span>
        ) : (
          <span key={i} className='blankSquare'></span>
        )
      ))}
     
      
     </div>
     <div className='letterConteiner'>
      <p>Tente adivinhar uma letra da palavra: </p>
      <form onSubmit={handleSubmit}>
        <input type="text" maxLength='1' required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInput} />
        <button>Jogar!</button>
      </form>
     </div>
     <div className='wrongLetterConteiner'>
      <p>Letras já Utilizadas: </p>
          {wrongLetters.map((letter, i) => (
            <span key={i} >{letter}, </span>
          ))}
     </div>
     
    </div>
  )
}

export default Game;