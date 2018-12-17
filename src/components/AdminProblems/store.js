import { observable, action } from 'mobx'
import TaskService from '../../services/TaskService'
import TopicService from '../../services/TopicService'

class AdminProblemsStore {
  @observable
  loading = false

  @observable
  topics = []

  @observable
  levels = []

  initialData = async () => {
    this.loading = true
    let topics = await TopicService.getAllTopic().then(resp => resp.data)
    let levels = await TopicService.getAllLevel().then(resp => resp.data)
    this.topics = topics
    this.levels = levels
    this.loading = false
  }

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

  /* Task Add Page */
  @observable
  task = {
    task_name: '',
    task_desc: '',
    input_desc: '',
    output_desc: '',
    constrain_desc: '',
    examples: '',
    default_code: '',
    enable: true,
    order: null,
    main_topic: null,
    secondary_topics: [],
    // ชั่วคราว
    topic: null,
    level: null
  }

  @action
  setTask = (field, value) => {
    this.task[field] = value
  }

  @observable
  testcases = [
    {
      test: '',
      expected_output: ''
    }
  ]

  @action
  addTestcase = () => {
    this.testcases.push({
      test: '',
      expected_output: ''
    })
  }

  @action
  setTestcase = (index, field, value) => {
    this.testcases[index][field] = value
  }

  @action
  addTask = async () => {
    let topic_level = await TopicService.getAllTopicLevel(this.task.topic, this.task.level).then(
      resp => resp.data[0]
    )

    let task = await TaskService.createTask({
      task_name: this.task.task_name,
      task_desc: this.task.task_desc,
      input_desc: this.task.input_desc,
      output_desc: this.task.output_desc,
      constrain_desc: this.task.constrain_desc,
      examples: this.task.examples,
      default_code: this.task.default_code,
      enable: true,
      order: null,
      main_topic: topic_level.pk,
      secondary_topics: []
    }).then(resp => resp.data)

    await Promise.all(
      this.testcases.map(async testcase => {
        await TaskService.createTestcase({
          ...testcase,
          is_hidden: false,
          task: task.id
        })
      })
    )
  }
}

export default new AdminProblemsStore()
