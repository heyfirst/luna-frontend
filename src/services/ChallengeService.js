import api from '../utils/api'

const ChallengeService = {
  getAllTask: () => {
    return api.get(`topics/challenge_tasks/`)
  },
  getLatestChallangeTask: () => {
    return api.get(`topics/challenge_tasks/?ordering=-created`)
  }
}

export default ChallengeService
