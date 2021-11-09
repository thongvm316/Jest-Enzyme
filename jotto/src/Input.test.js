import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps } from '../test/testUtils'
import Input from './Input'

// mock entire module for destructuring useState on import
// const mockSetCurrentGuess = jest.fn();
// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: (initialState) => [initialState, mockSetCurrentGuess]
// }))
// * Use in case which is dont use React.useState, use { useState } instead

/**
 * Factory function to create a ShallowWrapper for the Input component.
 * @function setup
 * @param {object} initialState - Initial state for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (success = false, secretWord = 'party') => {
  return shallow(<Input success={success} secretWord={secretWord} />)
}

describe('render', () => {
  describe('success is true', () => {
    let wrapper
    beforeEach(() => {
      wrapper = setup(true)
    })

    test('Input render without error', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input')
      expect(inputComponent.length).toBe(1)
    })

    test('input box does not show', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box')
      expect(inputBox.exists()).toBe(false)
    })

    test('button box does not show', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button')
      expect(submitButton.exists()).toBe(false)
    })
  })

  describe('success is false', () => {
    let wrapper
    beforeEach(() => {
      wrapper = setup(false)
    })

    test('Input render without error', () => {
      const inputComponent = findByTestAttr(wrapper, 'component-input')
      expect(inputComponent.length).toBe(1)
    })

    test('input box show', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box')
      expect(inputBox.exists()).toBe(true)
    })

    test('button box show', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button')
      expect(submitButton.exists()).toBe(true)
    })
  })
})

test('does not throw warning with expected props', () => {
  checkProps(Input, { secretWord: 'party' })
})

describe('state controlled input field', () => {
  let mockSetCurrentGuess = jest.fn()
  let wrapper
  let originalUseState

  beforeEach(() => {
    mockSetCurrentGuess.mockClear() // purpose: not taking the result of last test and carrying them to the next test
    originalUseState = React.useState // purpose: not taking the result of last test and carrying them to the next test
    React.useState = () => ['', mockSetCurrentGuess]
    wrapper = setup()
  })
  afterEach(() => {
    React.useState = originalUseState
  })
  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box')
    const mockEvent = { target: { value: 'train' } }

    inputBox.simulate('change', mockEvent)
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('train')
  })
  test('field is cleared upon submit button click', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button')

    submitButton.simulate('click', { preventDefault() {} }) // preventDefault() {} --> for use e.preventDefault() in Input.js
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('')

    // The mock function was called at least once with the specified args
    // expect(mockFunc).toHaveBeenCalledWith(arg1, arg2);
  })

  /* 
      1. Mock func to test React.useState - When use mock and test, this test just run mock func, not run relate React.useState in Input.js file.
      2. Get data-test and simulate onChange.
      3. Check with expect.
  */
})
