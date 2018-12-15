import api from '../utils/api'

const ChallengeService = {
  getAllTask: (level, solve, topic) => {
    return api.get(`topics/challenge_tasks/`, {
      level,
      solve,
      topic,
      ordering: '-created'
    })
  }
}

export default ChallengeService
