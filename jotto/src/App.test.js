import { mount } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'
import App from './App'

/**
 * Setup function for App Component
 * @return {ShallowWrapper}
 */

// activate global mock to make sure getSecretWord doesn't make network call
jest.mock('./actions') // mock module, refer index.js not in __mocks__
import { getSecretWord as mockGetSecretWord } from './actions' // refer __mocks__

const setup = () => {
  // use mount, because useEffect not called  on 'shallow'
  return mount(<App />)
}

test('renders without error', () => {
  const wrapper = setup()
  const appComponent = findByTestAttr(wrapper, 'component-app')
  expect(appComponent).toHaveLength(1)
})

describe('get secret word', () => {
  beforeEach(() => {
    // clear the mock calls from previous tests
    // mockGetSecretWord.mockClear() // ! should clear before test when mock func
  })

  test('getSecretWord on app mount', () => {
    const wrapper = setup()
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1) // check whether useEffect call or not in App.js file, and just call 1 time.
  })

  test('getSecretWord does not run on app update', () => {
    const wrapper = setup()
    mockGetSecretWord.mockClear() // ? it be used every test in beforeEach fnc, why use this here

    // using setProps because wrapper.update() does not trigger useEffect
    wrapper.setProps() // change prop for test useEffect.

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0)
  })
})

/** 
 * @Question
    - Why mock getSecretWord module here, while it be test in index.test.js?

 * @Response
    - For test with useEffect with App.js Component, in index.test.js just for test result when call api with axios.
*/
