import { observable, action } from 'mobx'
import TaskService from '../../services/TaskService'

class AdminProblemsStore {
  /*
    'TASK_LIST',
    'TASK_ADD'
  */
  @observable
  page = 'TASK_LIST'

  @action
  setPage = page => {
    this.page = page
  }

  /* Task List Page */
  @observable
  tasks = []

  @action
  fetchAllTasks = async () => {
    let tasks = await TaskService.getAllTasks().then(resp => resp.data)
    this.tasks = tasks
  }
}

export default new AdminProblemsStore()
