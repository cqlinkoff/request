# request

> http request based on [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) api

[![node](https://img.shields.io/node/v/@cqmbr/request.svg)](https://www.npmjs.com/package/@cqmbr/request)
[![npm](https://img.shields.io/npm/v/@cqmbr/request.svg)](https://www.npmjs.com/package/@cqmbr/request)
[![license](https://img.shields.io/npm/l/@cqmbr/request.svg)](https://github.com/cqmbr/request/blob/master/LICENSE)
[![Build Status](https://travis-ci.org/cqmbr/request.svg?branch=master)](https://travis-ci.org/cqmbr/request)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](http://standardjs.com/)
[![Coverage Status](https://coveralls.io/repos/github/cqmbr/request/badge.svg?branch=master)](https://coveralls.io/github/cqmbr/request?branch=master)

## Installation

```bash
npm i @cqmbr/request
```

## Use

```js
import Request from '@cqmbr/request'

const request = new Request(options)
```

## API

### `new Request(options)`

> create a request instance

- `options`:
  - `options.baseURL`: base url
  - `options.headers`: default headers
  - `options.beforeRequest`: will be called before request, you can handle with `request` config and return a new config, support `Promise`
  - `options.afterRequest`: will be called after request, you can handle with `response` and return it, support `Promise`

### `request.request(url, requestOptions)`

> basic http request

- `url`: `string` or `object`, if it's `object`, it will be treated as `requestOptions`, see [`requestOptions`](#requestoptions)
- `requestOptions`: see [`requestOptions`](#requestoptions)

### `request.get(url, requestOptions): Promise<any>`

> request use `GET`

### `request.post(url, requestOptions): Promise<any>`

> request use `POST`

### `request.put(url, requestOptions): Promise<any>`

> request use `PUT`

### `request.patch(url, requestOptions): Promise<any>`

> request use `PATCH`

### `request.del(url, requestOptions): Promise<any>`

> request use `DELETE`

## `requestOptions`

> request config, may have follow keys:

- `url`: `string`
> resource url, it will be automatically added after `baseURL` if you set it in constructor, support `params`
- `query`: `object`
> query params, it will be automatically added after `url`
- `body`: `object`
> request body, if request method is `GET`, it's same as `query`
- `params`: `object`
> url params will be automatically replaced based on `params`, such as `/{id}` will be replaced by `params.id`
- `headers`: `object`
> request headers

## TODO

- [ ] unit test
