import './App.css';
import Congrats from './Congrats';
import GuessedWords from './GuessedWords';
import Input from './Input'
import React, { useEffect } from 'react'
import { getSecretWord } from './actions'
import languageContext from './contexts/languageContext';
import successContext from './contexts/successContext';
import LanguagePicker from './LanguagePicker';
import guessedWordsContext from './contexts/guessedWordsContext';

const reducer = (state, action) => {
  switch (action.type) {
    case 'setSecretWord':
      return { ...state, secretWord: action.payload }
    case 'setLanguage':
      return { ...state, language: action.payload }
    default:
      throw new Error(`Invalid action type: ${action.type}`)
  }
}

function App() {

  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null, language: 'en' }
  )

  const success = false
  const guessedWords = []

  const setSecretWord = (secretWord) => {
    dispatch({ type: 'setSecretWord', payload: secretWord })
  }
  const setLanguage = (language) => {
    dispatch({ type: 'setLanguage', payload: language });
  }

  useEffect(() => {
    getSecretWord(setSecretWord)
  }, [])

  if (state.secretWord === null) {
    return (
      <div className='container' data-test="spinner">
        <div className='spinner-border' role="status">
          <span className='sr-only'>Loading...</span>
        </div>
        <p>Loading secret word...</p>
      </div>
    )
  }

  return (
    <div data-test="component-app" className="container">
      <h1>Jotto</h1>{/* 
      <div>The secret word is {secretWord}</div> */}
      <languageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage} />
        <guessedWordsContext.GuessedWordsProvider>
          <successContext.SuccessProvider>
            <Congrats success={success} />
            <Input secretWord={state.secretWord} />
          </successContext.SuccessProvider>
          <GuessedWords />
        </guessedWordsContext.GuessedWordsProvider>
      </languageContext.Provider>
    </div>
  );
}

export default App;
