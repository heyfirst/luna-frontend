import api from '../utils/api'

const ChallengeService = {
  getAllTask: () => {
    return api.get(`topics/challange_tasks/`)
  }
}

export default ChallengeService
