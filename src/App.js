import logo from './logo.svg';
import './App.css';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input'
import { useEffect } from 'react'
import { getSecretWord } from './actions'
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const success = useSelector(state => state.success)
  const guessedWords = useSelector(state => state.guessedWords)

  const secretWord = useSelector(state => state.secretWord)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSecretWord())
  }, [])

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>
      <div>The secret word is {secretWord}</div>
      <Congrats success={success} />
      <Input success={success} secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  );
}

export default App;
