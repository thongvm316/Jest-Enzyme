import { useEffect } from 'react'

import './App.css'

import GuessedWords from './GuessedWords'
import Congrats from './Congrats'
import Input from './Input'
import { getSecretWord } from './actions'

function App() {
  // TODO: get props from shared state
  const success = false
  const secretWord = 'party'
  const guessedWords = [
    // { guessedWord: 'agile', letterMatchCount: 1 },
    // { guessedWord: 'agilee', letterMatchCount: 3 },
  ]

  useEffect(() => {
    getSecretWord()
  }, [])

  return (
    <div className='container' data-test='component-app'>
      <h1>Jotto</h1>
      <Congrats success={success} />
      <Input success={success} secretWord={secretWord} />
      <GuessedWords guessedWords={guessedWords} />
    </div>
  )
}

export default App
