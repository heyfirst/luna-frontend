import api from '../utils/api'

const TaskService = {
  getTaskByID: id => {
    return api.get(`tasks/tasks/${id}`)
  },
  getTestcaseByTaskID: id => {
    return api.get(`tasks/tasks/${id}/testcase`)
  }
}

export default TaskService
