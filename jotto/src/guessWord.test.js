import React from 'react'
import { mount } from 'enzyme' // ! test entire app, not isolated like Shallow

import App from './App'
import { findByTestAttr } from '../test/testUtils'

/**
 * Create wrapper with specified initial conditions,
 * then submit a guessed word of 'train'
 # @function
 *
 * @param {object} state - Initial conditions.
 * @returns {Wrapper} - Enzyme wrapper of mounted App component
 */

const setup = (state = {}) => {
  // TODO: apply state
  const wrapper = mount(<App />)

  // add value to input box
  const inputBox = findByTestAttr(wrapper, 'input-box')
  inputBox.simulate('change', { target: { value: 'train' } })

  // simulate click on submit button
  const submitButton = findByTestAttr(wrapper, 'submit-button')
  submitButton.simulate('click', { preventDefault() {} })

  return wrapper
} // ? why not use jest mock here, but Input.test.js use, analyze?

describe.skip('no words guessed', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [],
    })
  })

  test('creates GuessWords table with one row', () => {
    const guessedWordRows = findByTestAttr(wrapper, 'guessed-word')
    expect(guessedWordRows).toHaveLength(1)
  })
})

describe.skip('some words guessed', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }],
    })
  })
  test('adds row to guessedWords table', () => {
    const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word')
    expect(guessedWordNodes).toHaveLength(2)
  })
})

describe.skip('guess secret guessed', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup({
      secretWord: 'party',
      success: false,
      guessedWords: [{ guessedWord: 'agile', letterMatchCount: 1 }],
    })

    // add value to input box
    const inputBox = findByTestAttr(wrapper, 'input-box')
    const mockEvent = { target: { value: 'party' } }
    inputBox.simulate('change', mockEvent)

    // simulate click on submit button
    const submitButton = findByTestAttr(wrapper, 'submit-button')
    submitButton.simulate('click', { preventDefault() {} })
  })
  test('adds row to guessedWords table', () => {
    const guessedWordNodes = findByTestAttr(wrapper, 'guessed-word')
    expect(guessedWordNodes).toHaveLength(3)
  })
  test('displays congrats component', () => {
    const congrats = findByTestAttr(wrapper, 'component-congrats')
    expect(congrats.text().length).toBeGreaterThan(0)
  })
  test('does not display input component contents', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box')
    expect(inputBox.exists()).toBe(false)

    const submitButton = findByTestAttr(wrapper, 'submit-button')
    expect(submitButton.exists()).toBe(false)
  })
})

// * for check entire app
