import api from '../utils/api'

const TopicService = {
  getAllTopic: () => {
    return api.get('/topics/topics/')
  }
}

export default TopicService
