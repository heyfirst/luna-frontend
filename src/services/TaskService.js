import api from '../utils/api'

const TaskService = {
  getAllTasks: () => {
    return api.get(`tasks/tasks/`)
  },
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
  },
  // CREATE Task
  createTask: data => {
    return api.post(`tasks/tasks/`, data)
  },
  createTestcase: data => {
    return api.post(`tasks/testcases/`, data)
  },
  getLastOfOrderInMainTopic: main_topic => {
    return api.get(`tasks/last-order/`, { main_topic })
  },
  // UPDATE Task
  updateTask: (id, data) => {
    return api.put(`tasks/tasks/${id}/`, data)
  },
  updateTestcase: (id, data) => {
    return api.put(`tasks/testcases/${id}/`, data)
  }
}

export default TaskService
