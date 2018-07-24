import Request from '../src'

describe('Request', () => {
  test('create request instance with no options', () => {
    const request = new Request()

    expect(request).toBeInstanceOf(Request)
    expect(request.baseURL).toBe('')
    expect(request.defaultHeaders).toEqual({})
  })
  test('create request instance with options', () => {
    const request = new Request({
      baseURL: 'http://a.b',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    expect(request).toBeInstanceOf(Request)
    expect(request.baseURL).toBe('http://a.b')
    expect(request.defaultHeaders).toEqual({
      'Content-Type': 'application/json'
    })
  })
})
