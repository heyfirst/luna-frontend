import api from '../utils/api'

const TopicService = {
  getAllTopic: () => {
    return api.get('/topics/topics/')
  },
  getTopic: id => {
    return api.get(`/topics/topics/${id}`)
  },
  getTaskFromTopicID: id => {
    return api.get(`/tasks/tasks/?limit=100&ordering=order`)
  }
}

export default TopicService
