import { observable, action, computed, runInAction } from 'mobx'
import { notification, Modal } from 'antd'

import SolveService from '../../services/TaskService'
import TaskService from '../../services/TaskService'

class SolveStore {
  @observable
  loading = true

  @observable
  task = {}

  @observable
  testcases = []

  @observable
  result = []

  @observable
  error = {}

  @observable
  code = ``

  @observable
  duration = 0

  @observable
  countingTime = null

  @action
  fetchTask = async (id, history) => {
    const task = await SolveService.getTaskByID(id)
      .then(resp => resp.data)
      .catch(err => {
        if (err.status === 403) {
          console.log('hos')
          notification['error']({
            message: 'Forbidden!',
            description: 'You must going to completed the before task.'
          })
        }
        return { err }
      })

    if (task.err) {
      history.goBack()
      return
    }

    const testcases = await SolveService.getTestcasesByTaskID(id)
      .then(resp => resp.data)
      .catch(err => {
        console.log(err)
      })

    this.task = task
    this.testcases = testcases

    if (task.answer) {
      this.code = task.answer.source_code
    } else {
      this.code = task.default_code
    }

    this.loading = false
  }

  @action
  setDefaultState = () => {
    this.task = {}
    this.testcases = []
    this.code = ``
    this.result = []
    this.error = {}
    this.duration = 0
    this.loading = true
    clearInterval(this.countingTime)
  }

  @action
  changeCode = code => {
    this.code = code
  }

  @action
  runTest = async () => {
    const result = await SolveService.testCode({
      taskID: this.task.id,
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
      this.resultPanelState = 'TESTCASE'
      this.result = result.submission.result
      if (result.submission.pass === false) {
        notification['warning']({
          message: 'Something Wrong!',
          description: `Something are wrong in testcase, Let's fix it!.`
        })
      } else {
        notification['success']({
          message: `Your code's right!`,
          description: `You're pass this testcase, try to submit your code!`
        })
      }
    }
  }

  @action
  submit = async history => {
    const result = await SolveService.submitCode({
      taskID: this.task.id,
      code: this.code,
      duration: this.duration
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
      this.resultPanelState = 'TESTCASE'
      this.result = result.submission.result
      if (result.submission.pass === false) {
        notification['warning']({
          message: 'Something Wrong!',
          description: `Something are wrong in your algorithms, Let's fix it!.`
        })
      } else {
        if (result.answered) {
          Modal.success({
            title: `You've passed this task`,
            content: `You have passed this task, try a new task!`,
            onOk: () => {
              this.redirectToPreventPage(history, this.task)
            }
          })
        } else {
          Modal.success({
            title: `Yeah! You're Pass`,
            content: `You're pass this task, Welcome!!`,
            onOk: () => {
              this.redirectToPreventPage(history, this.task)
            }
          })
        }
      }
    }
  }

  redirectToPreventPage = (history, task) => {
    if (!task.order) {
      history.push(`/challenge`)
    } else {
      history.push(`/practice/${task.main_topic.topic.id}`)
    }
  }

  @observable
  resultPanelState = 'TESTCASE'

  @action
  setResultPanelState = state => {
    this.resultPanelState = state
  }

  @action
  startDuration = () => {
    this.countingTime = setInterval(
      () =>
        runInAction(() => {
          this.duration += 1
        }),
      1000
    )
  }

  @computed
  get durationInTime() {
    if (this.duration > 0) {
      return `${parseInt(this.duration / 60, 10) < 10 ? 0 : ''}${parseInt(
        this.duration / 60,
        10
      )} : ${this.duration % 60 < 10 ? 0 : ''}${this.duration % 60}`
    } else {
      return '00 : 00'
    }
  }

  /*
    1: TASK_DETAIL
    2: SOLUTIONไ
  */

  @observable
  leftPanel = 'TASK_DETAIL'

  @action
  setLeftPanel = state => {
    this.leftPanel = state
  }

  @observable
  solutions = []

  @observable
  solution_select = null

  @action
  setSolutionSelect = solution => {
    this.solution_select = solution
  }

  @action
  fetchAnswers = async () => {
    let solutions = await TaskService.getAnswersByTaskID(this.task.id).then(resp => resp.data)
    this.solutions = solutions
  }
}

export default new SolveStore()
