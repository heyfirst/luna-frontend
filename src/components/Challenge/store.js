import { observable, action, runInAction } from 'mobx'
import ChallengeService from '../../services/ChallengeService'

class ChallangeStore {
  @observable
  tasks = []

  @observable
  level = 'All'

  @observable
  solve = 'All'

  @observable
  topic = 'All'

  @action
  onLevelChange = async level => {
    this.level = level
    await this.getChallange()
  }

  @action
  onSolveChange = async solve => {
    this.solve = solve
    await this.getChallange()
  }

  @action
  onTopicChange = async topic => {
    this.topic = topic
    await this.getChallange()
  }

  @action
  getChallange = async () => {
    await ChallengeService.getAllTask(this.level, this.solve, this.topic).then(resp => {
      this.tasks = resp.data
    })
  }
}

export default new ChallangeStore()
