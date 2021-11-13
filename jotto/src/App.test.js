import { mount } from 'enzyme'
import { findByTestAttr } from '../test/testUtils'
import App from './App'

/**
 * Setup function for App Component
 * @return {ShallowWrapper}
 */

// activate global mock to make sure getSecretWord doesn't make network call
jest.mock('./actions') // mock module
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
    mockGetSecretWord.mockClear()
  })

  test('getSecretWord on app mount', () => {
    const wrapper = setup()
    expect(mockGetSecretWord).toHaveBeenCalledTimes(1)
  })

  test('getSecretWord does not run on app update', () => {
    const wrapper = setup()
    mockGetSecretWord.mockClear()

    // using setProps because wrapper.update() does not  trigger useEffect
    wrapper.setProps()

    expect(mockGetSecretWord).toHaveBeenCalledTimes(0)
  })
})
