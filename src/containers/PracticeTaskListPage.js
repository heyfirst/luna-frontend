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

  // Function เช็ค Card ไหนต้องส้ราง Link
  linkCard = tasks => {
    const isLock = !(
      tasks.answered ||
      tasks.order === 1 ||
      this.state.tasks.find(t => t.answered && t.order === tasks.order - 1) !== undefined
    )
    if (!isLock) {
      return (
        <Link to={`/tasks/${tasks.id}`}>
          <TaskItem name={tasks.task_name} difficult={tasks.main_topic.level.level_name} />
        </Link>
      )
    } else {
      return <TaskItem name={tasks.task_name} difficult={tasks.main_topic.level.level_name} />
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
                    {this.state.tasks.map(
                      (tasks, index) =>
                        tasks.main_topic &&
                        tasks.order &&
                        tasks.main_topic.topic.topic_name === this.state.topic.topic_name && (
                          <React.Fragment key={index}>{this.linkCard(tasks)}</React.Fragment>
                        )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Layout>
    )
  }
}

export default TaskListPage
