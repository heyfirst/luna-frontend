import api from '../utils/api'

const UserService = {
  facebookLogin: accessToken => {
    return api.post(`/accounts/fb-login/`, { accessToken })
  },
  getProfile: () => {
    return api.get(`/accounts/me/`)
  },
  getLearningProgress: () => {
    return api.get(`/accounts/learning-progress/`)
  },
  getFrequencyPractics: () => {
    return api.get(`/accounts/frequency-practics/`)
  },
  getSkillImprovement: (startDate, endDate, topicId = null) => {
    if (topicId === null) {
      return api.get(`/accounts/skill-improvement/?start_date=${startDate}&end_date=${endDate}`)
    } else {
      return api.get(
        `/accounts/skill-improvement/?start_date=${startDate}&end_date=${endDate}&topicId=${topicId}`
      )
    }
  }
}

export default UserService
