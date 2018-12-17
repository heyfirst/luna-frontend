import api from '../utils/api'

const TopicService = {
  getAllTopic: () => {
    return api.get('/topics/topics/')
  },
  getAllLevel: () => {
    return api.get('/topics/levels/')
  },
  getAllTopicLevel: (topic, level) => {
    return api.get('/topics/topic-levels/', {
      topic,
      level
    })
  },
  getTopic: id => {
    return api.get(`/topics/topics/${id}`)
  },
  getTaskFromTopicID: id => {
    return api.get(`/topics/topics/${id}/tasks`)
  }
}

export default TopicService
