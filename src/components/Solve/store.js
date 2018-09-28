import { observable, action } from 'mobx'
import { notification } from 'antd'
import SolveService from '../../services/SolveService'

class SolveStore {
  @observable
  task = {}

  @observable
  testcases = []

  @observable
  result = []

  @observable
  error = {}

  @observable
  code = `public String getStudent() {
  return "123456";
}`

  @action
  fetchTask = async id => {
    const task = await SolveService.getTaskByID(id)
      .then(resp => resp.data)
      .catch(err => {
        console.log(err)
      })

    const testcases = await SolveService.getTestcasesByTaskID(id)
      .then(resp => resp.data)
      .catch(err => {
        console.log(err)
      })

    this.task = task
    this.testcases = testcases
  }

  @action
  changeCode = code => {
    this.code = code
  }

  @action
  runTest = async () => {
    const result = await SolveService.testCode({
      taskID: this.task.pk,
      code: this.code
    }).then(resp => resp.data)

    if (result.submission.err) {
      notification['error']({
        message: 'Error!',
        description: 'See error statement in console panel.'
      })
      this.resultPanelState = 'CONSOLE'
      this.error = result.submission.err
    } else {
      this.error = {}
      this.result = result.submission
      if (this.result.pass === false) {
        notification['warning']({
          message: 'Something Wrong!',
          description: `Something are wrong in testcase, Let's fix it!.`
        })
      } else {
        notification['success']({
          message: `Yeah! You're Pass`,
          description: `You're pass this task, try to submit your code!`
        })
      }
    }
  }

  @action
  submit = () => {
    console.log('submit!')
  }

  @observable
  resultPanelState = 'TESTCASE'

  @action
  setResultPanelState = state => {
    this.resultPanelState = state
  }
}

export default new SolveStore()
