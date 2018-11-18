import api from '../utils/api'

const TaskService = {
  getCompletedTasks: () => {
    return api.get(`tasks/completed/`)
  },
  getTaskByID: id => {
    return api.get(`tasks/tasks/${id}`)
  },
  getTestcasesByTaskID: id => {
    return api.get(`tasks/tasks/${id}/testcases`)
  },
  testCode: data => {
    return api.post(`answers/solve/test-code`, data)
  },
  submitCode: data => {
    return api.post(`answers/solve/submit-code`, data)
  }
}

export default TaskService
