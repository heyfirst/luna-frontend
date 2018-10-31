import api from '../utils/api'

const ChallengeService = {
  getAllTask: () => {
    return api.get(`topics/challenge_tasks/`)
  }
}

export default ChallengeService
