import api from '../utils/api'

const RankingService = {
  getRanking: () => {
    return api.get(`accounts/ranking/`)
  }
}

export default RankingService
