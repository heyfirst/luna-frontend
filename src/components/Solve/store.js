import { observable, action } from 'mobx'

class SolveStore {
  @observable
  code = ''

  @action
  changeCode = code => {
    this.code = code
  }
}

export default new SolveStore()
