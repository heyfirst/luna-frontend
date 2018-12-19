import api from '../utils/api'

const TaskService = {
  getAllTasks: (level = 'All', topic = 'All', has_order) => {
    return api.get(`tasks/tasks/`, {
      level,
      has_order,
      topic
    })
  },
  getCompletedTasks: username => {
    return api.get(`tasks/completed/`, { username })
  },
  getTaskByID: id => {
    return api.get(`tasks/tasks/${id}`)
  },
  getTestcasesByTaskID: id => {
    return api.get(`tasks/tasks/${id}/testcases`)
  },
  getAnswersByTaskID: (task = null) => {
    return api.get(`answers/answers/`, {
      task
    })
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
