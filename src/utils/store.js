const store = {
  getAccessToken: () => window.localStorage.getItem('luna-token'),
  setAccessToken: token => window.localStorage.setItem('luna-token', token),
  removeAccessToken: () => window.localStorage.removeItem('luna-token')
}

export default store
