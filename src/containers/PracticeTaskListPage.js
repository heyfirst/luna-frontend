import React from 'react'
import styled from 'styled-components'
import requireAuth from '../utils/requireAuth'
import TopicService from '../services/TopicService'
import { Link } from 'react-static'
import Layout from '../components/Core/Layout'

import TopicCard from '../components/Topic/TopicCard'
import TaskItem from '../components/Task/TaskItem'

const DivCard = styled.div`
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.625rem !important;
  margin-bottom: 1.25rem;
  filter: drop-shadow(0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.1));
`

@requireAuth()
class TaskListPage extends React.Component {
  state = {
    loading: true,
    topic: {},
    tasks: [],
    level: ['Beginner', 'Intermediate', 'Advance'],
    solve: ['Solved', 'Unsolved'],
    levelresult: '',
    solveresult: ''
  }

  async componentWillMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const { match } = this.props
    const topic = await TopicService.getTopic(match.params.topicID).then(resp => resp.data)
    const tasks = await TopicService.getTaskFromTopicID(match.params.topicID).then(
      resp => resp.data
    )

    this.setState({
      topic,
      tasks,
      loading: false
    })
  }

  checkLastTaskInLevelIsSuccess = task => {
    let level_index = this.state.level.indexOf(task.main_topic.level.level_name)
    let level = this.state.level[level_index]

    if (level === 'Beginner') {
      return true
    }

    // Checking
    let prevent_level = this.state.level[level_index - 1]
    let prevent_level_task_length = this.state.tasks.filter(
      t => t.main_topic.level.level_name === prevent_level
    ).length

    let prevent_level_task = this.state.tasks.filter(
      t => t.main_topic.level.level_name === prevent_level
    )[prevent_level_task_length - 1]

    if (
      prevent_level_task.answered &&
      (task.order === 1 ||
        this.state.tasks
          .filter(t => t.main_topic.level.level_name === level)
          .find(t => t.answered && t.order === task.order - 1) !== undefined)
    ) {
      return true
    } else {
      return false
    }
  }

  // Function เช็ค Card ไหนต้องส้ราง Link
  linkCard = task => {
    const isLock = !(
      task.answered ||
      task.order === 1 ||
      this.state.tasks.find(t => t.answered && t.order === task.order - 1) !== undefined
    )

    if (!isLock && this.checkLastTaskInLevelIsSuccess(task)) {
      return (
        <TaskItem
          name={`${task.order}. ${task.task_name}`}
          difficult={task.main_topic.level.level_name}
          taskID={task.id}
          topic={task.main_topic.topic.topic_name}
          solved={task.answered}
        />
      )
    } else {
      return (
        <TaskItem
          name={`${task.order}. ${task.task_name}`}
          difficult={task.main_topic.level.level_name}
          taskID={task.id}
          topic={task.main_topic.topic.topic_name}
          locked
        />
      )
    }
  }

  render() {
    return (
      <Layout>
        {!this.state.loading && (
          <div className="container-fluid my-4">
            <div className="row">
              <div className="col">
                <DivCard className="card w-50 border-0">
                  <TopicCard topic={this.state.topic} />
                </DivCard>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-sm-6 offset-sm-3">
                <div className="card">
                  <div className="card-header">
                    <h5 className="m-0">โจทย์ระดับง่าย</h5>
                  </div>
                  <div className="card-body">
                    {this.state.tasks
                      .filter(t => t.main_topic.level.level_name === 'Beginner')
                      .map((tasks, index) => (
                        <React.Fragment key={index}>{this.linkCard(tasks)}</React.Fragment>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            {this.state.tasks.filter(t => t.main_topic.level.level_name === 'Intermediate').length >
              0 && (
              <div className="row mb-4">
                <div className="col-sm-6 offset-sm-3">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="m-0">โจทย์ระดับปานกลาง</h5>
                    </div>
                    <div className="card-body">
                      {this.state.tasks
                        .filter(t => t.main_topic.level.level_name === 'Intermediate')
                        .map((tasks, index) => (
                          <React.Fragment key={index}>{this.linkCard(tasks)}</React.Fragment>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {this.state.tasks.filter(t => t.main_topic.level.level_name === 'Advance').length >
              0 && (
              <div className="row mb-4">
                <div className="col-sm-6 offset-sm-3">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="m-0">โจทย์ระดับยาก</h5>
                    </div>
                    <div className="card-body">
                      {this.state.tasks
                        .filter(t => t.main_topic.level.level_name === 'Advance')
                        .map((tasks, index) => (
                          <React.Fragment key={index}>{this.linkCard(tasks)}</React.Fragment>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Layout>
    )
  }
}

export default TaskListPage
