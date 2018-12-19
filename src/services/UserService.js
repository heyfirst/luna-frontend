import api from '../utils/api'

const UserService = {
  facebookLogin: accessToken => {
    return api.post(`/accounts/fb-login/`, { accessToken })
  },
  getProfile: () => {
    return api.get(`/accounts/me/`)
  },
  getAccount: userID => {
    return api.get(`/accounts/account/`, {
      username: userID
    })
  },
  updateProfile: body => {
    return api.patch(`/accounts/me/`, { ...body })
  },
  uploadAvatar: data => {
    return api.post(`/accounts/me/upload-avatar/`, data)
  },
  getLearningProgress: username => {
    return api.get(`/accounts/learning-progress/`, { username })
  },
  getFrequencyPractics: username => {
    return api.get(`/accounts/frequency-practics/`, { username })
  },
  getSkillImprovement: (username, startDate, endDate, topicId = null) => {
    if (topicId === null) {
      return api.get(`/accounts/skill-improvement/`, {
        start_date: startDate,
        end_date: endDate,
        username
      })
    } else {
      return api.get(`/accounts/skill-improvement/`, {
        topic_id: topicId,
        start_date: startDate,
        end_date: endDate,
        username
      })
    }
  },
  getSuggestionTasks: () => {
    return api.get(`/accounts/suggestion-tasks/`)
  }
}

export default UserService
