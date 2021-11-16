import moxios from 'moxios'
import { getSecretWord, correctGuess, actionTypes } from './'

describe('correctGuess', () => {
  test('returns ac action with type `CORRECT_GUESS`', () => {
    const action = correctGuess()
    expect(action).toStrictEqual({ type: actionTypes.CORRECT_GUESS }) // * toStrictEqual instead cuz obj is mutable, can't use toBe to compare
  })
})

describe('getSecretWord', () => {
  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  test('secretWord is returned', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: 'party',
      })
    })

    return getSecretWord().then((secretWord) => {
      expect(secretWord).toBe('party')
    })

    /**  
     * @Question 
        - Config moxios - make a request and response
        - Return redux action - and in this action, use real axios and api from server

        How do this test work and return result?

     * @Response
        - Flow: test -> function -> axios -> test -> use moxios for test, not call http request here although getSecretWord() was call a http request

     * @Purpose
        - Avoid call http request when test 
    */
  })
})
