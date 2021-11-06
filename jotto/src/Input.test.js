import React from 'react'
import { shallow } from 'enzyme'

import { findByTestAttr, checkProps } from '../test/testUtils'
import Input from './Input'

/**
 * Factory function to create a ShallowWrapper for the Input component.
 * @function setup
 * @param {object} initialState - Initial state for this setup.
 * @returns {ShallowWrapper}
 */
const setup = (secretWord = 'party') => {
  return shallow(<Input secretWord={secretWord} />)
}

test('Input render without error', () => {
  const wrapper = setup()
  const inputComponent = findByTestAttr(wrapper, 'component-input')
  expect(inputComponent.length).toBe(1)
})

test('does throw warning with expected prop', () => {
  checkProps(Input, { secretWord: [] })
})
