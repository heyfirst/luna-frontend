import api from '../utils/api'

const TopicService = {
  getAllTopic: () => {
    return api.get('/topics/topics/')
  },
  getTopic: id => {
    return api.get(`/topics/topics/${id}`)
  },
  getTaskFromTopicID: id => {
    return api.get(`/topics/topics/${id}/tasks`)
  }
}

export default TopicService
