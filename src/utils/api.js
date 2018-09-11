import axios from 'axios'
import store from './store'

const createApiInstance = () =>
  axios.create({
    // baseURL: config.apiPath,
    baseURL: 'https://api.dev.luna.codes',
    headers: {
      Authorization: store.getAccessToken() ? `JWT ${store.getAccessToken()}` : ''
    }
  })

const handleResponse = response => {
  return Promise.resolve(response)
}

const catchError = e => Promise.reject(e.response)

export default {
  get: path =>
    createApiInstance()
      .get(path)
      .then(handleResponse)
      .catch(catchError),
  post: (path, body = {}, headers = {}) =>
    createApiInstance()
      .request({
        url: path,
        method: 'POST',
        headers,
        data: body
      })
      .then(handleResponse)
      .catch(catchError),
  patch: (path, body = {}) =>
    createApiInstance()
      .request({
        url: path,
        method: 'PATCH',
        data: body
      })
      .then(handleResponse)
      .catch(catchError),
  delete: path =>
    createApiInstance()
      .delete(path)
      .then(handleResponse)
      .catch(catchError)
}
