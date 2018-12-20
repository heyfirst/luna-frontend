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
  },
  createTopic: (topicName, desc, logo) => {
    const data = new FormData()
    data.append('topic_name', topicName)
    data.append('description', desc)
    data.append('logo', logo)

    return api.post(`/topics/topics/`, data)
  },
  updateTopic: (id, topicName, desc, logo) => {
    const data = new FormData()
    data.append('topic_name', topicName)
    data.append('description', desc)
    if (logo) {
      data.append('logo', logo)
    }

    return api.put(`/topics/topics/${id}/`, data)
  },
  createTopicLevel: (topic_id, level_id) => {
    return api.post(`/topics/topic-levels/`, {
      topic: topic_id,
      level: level_id
    })
  }
}

export default TopicService
