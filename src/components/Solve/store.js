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

  @action
  runTest = () => {
    console.log('test')
  }

  @action
  submit = () => {
    console.log('submit!')
  }
}

export default new SolveStore()
