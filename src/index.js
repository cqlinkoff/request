import qs from 'query-string'
import template from 'string-template'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'

const noop = (arg) => arg

export default class Request {
  constructor (options = {}) {
    const {
      baseURL = '',
      headers = {},
      beforeRequest = noop,
      afterRequest = noop
    } = options

    this.baseURL = baseURL
    this.defaultHeaders = headers
    this.beforeRequest = beforeRequest
    this.afterRequest = afterRequest
  }

  __getBody = async (res) => {
    const type = res.headers.get('Content-Type')

    if (type && type.indexOf('json') !== -1) {
      const json = await res.json()
      return json
    }

    const body = await res.text()

    try {
      return JSON.parse(body)
    } catch (error) {
      return { body }
    }
  }

  __parseReq = ({ url, query, params, body, baseURL = this.baseURL, method = 'GET', ...req }) => {
    if (body) {
      if (typeof body === 'object') {
        if (/^(POST|PUT|PATCH)$/i.test(method)) {
          body = JSON.stringify(body)
        } else {
          url += ((url.indexOf('?') !== -1) ? '&' : '?') + qs.stringify(body)
          body = null
        }
      }
      if (body) {
        req.body = body
      }
    }

    if (query) {
      if (typeof query === 'object') {
        query = qs.stringify(query)
      }

      if (query) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + query
      }
    }

    if (params) {
      url = template(url, params)
    }
    if (/^\/[^/]/.test(url) && baseURL) {
      url = baseURL + url
    }

    req.url = url
    return req
  }

  request = async (url, options = {}) => {
    if (isPlainObject(url)) {
      options = { ...url }
    }

    if (!isPlainObject(options)) {
      throw new TypeError('Options must be an object!')
    }

    if (isString(url)) {
      options.url = url
    }

    if (isPlainObject(options.headers)) {
      options.headers = { ...this.defaultHeaders, ...options.headers }
    } else {
      options.headers = this.defaultHeaders
    }

    if (!isString(options.url)) {
      throw new TypeError('URL must be string')
    }

    let req = this.__parseReq(options)

    try {
      if (typeof this.beforeRequest === 'function') {
        req = await this.beforeRequest(req)
      }

      let res = await window.fetch(req.url, req)
      if (typeof this.afterRequest === 'function') {
        res = await this.afterRequest(res)
      }
      const body = await this.__getBody(res)

      if (res.status >= 200 && res.status < 400) {
        return body
      } else {
        throw body
      }
    } catch (error) {
      throw error
    }
  }

  get = (url, req = {}) => {
    req.url = url
    req.method = 'GET'
    return this.request(req)
  }

  post = (url, req = {}) => {
    req.url = url
    req.method = 'POST'
    return this.request(req)
  }

  put = (url, req = {}) => {
    req.url = url
    req.method = 'PUT'
    return this.request(req)
  }

  patch = (url, req = {}) => {
    req.url = url
    req.method = 'PATCH'
    return this.request(req)
  }

  del = (url, req = {}) => {
    req.url = url
    req.method = 'DELETE'
    return this.request(req)
  }
}