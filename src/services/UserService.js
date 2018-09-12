import api from '../utils/api'

const UserService = {
  facebookLogin: accessToken => {
    return api.post(`/accounts/fb-login/`, { accessToken })
  },
  getProfile: () => {
    return api.get(`/accounts/me/`)
  }
}

export default UserService
