import { observable, action } from 'mobx'

class SolveStore {
  @observable
  code = `class Student {
    public String getStudent() {
      return "123456";
    }
  }`

  @action
  changeCode = code => {
    this.code = code
  }
}

export default new SolveStore()
