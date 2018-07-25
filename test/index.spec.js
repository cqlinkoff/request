import MockServer from 'mock-http-server'
import Request from '../src'

describe('Request', () => {
  const server = new MockServer({ host: 'localhost', port: 9000 })
  beforeEach(done => {
    server.start(done)
  })
  afterEach(done => {
    server.stop(done)
  })

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
  test('basic request use GET', async () => {
    const testData = { hello: 'world' }
    server.on({
      method: 'GET',
      path: '/test',
      reply: {
        status: 200,
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(testData)
      }
    })

    const request = new Request({
      baseURL: 'http://localhost:9000',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await request.get('/test')
    expect(data).toEqual(testData)
  })

  // test('basic request use POST', async () => {
  //   const testData = { hello: 'world' }
  //   server.on({
  //     method: 'POST',
  //     path: '/test',
  //     reply: {
  //       status: 201,
  //       headers: { 'content-type': 'application/json' },
  //       body: JSON.stringify({
  //         ...testData,
  //         id: 1
  //       })
  //     }
  //   })

  //   const request = new Request({
  //     baseURL: 'http://localhost:9000',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   const data = await request.post('/test', {
  //     body: testData
  //   })

  //   console.log(data)

  //   expect(data).toEqual({
  //     ...testData,
  //     id: 1
  //   })
  // })
})
