import api from '../utils/api'

const ChallengeService = {
  getAllTask: () => {
    return api.get(`tasks/challange_tasks/`)
  }
}

export default ChallengeService
