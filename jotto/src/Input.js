import React from 'react'
import PropTypes from 'prop-types' // ES6

import { useSelector } from 'react-redux'

const Input = ({ secretWord }) => {
  const [currentGuess, setCurrentGuess] = React.useState('')
  const success = useSelector((state) => state.success)

  if (success) {
    return <div data-test='component-input' />
  }

  return (
    <div data-test='component-input'>
      <form className='form-inline'>
        <input
          data-test='input-box'
          className='mb-2 mx-sm-3'
          type='text'
          //   placeholder={stringsModule.getStringByLanguage(
          //     language,
          //     'guessInputPlaceholder',
          //   )}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}
        />
        <button
          data-test='submit-button'
          onClick={(evt) => {
            evt.preventDefault()
            // // update guessedWords
            // const letterMatchCount = getLetterMatchCount(
            //   currentGuess,
            //   secretWord,
            // )
            // const newGuessedWords = [
            //   ...guessedWords,
            //   { guessedWord: currentGuess, letterMatchCount },
            // ]
            // setGuessedWords(newGuessedWords)

            // // check against secretWord and update success if necessary
            // if (currentGuess === secretWord) setSuccess(true)

            // clear input box
            setCurrentGuess('')
          }}
          className='btn btn-primary mb-2'
        >
          {/* {stringsModule.getStringByLanguage(language, 'submit')} */}
          Button
        </button>
      </form>
    </div>
  )
}

Input.propTypes = {
  secretWord: PropTypes.string.isRequired,
}

export default Input
