import React from 'react'
import styled from 'styled-components'
import requireAuth from '../utils/requireAuth'
import TopicService from '../services/TopicService'
import { Link } from 'react-static'

const TaskCard = styled.div`
  a {
    color: #666;
    transition: all 0.3s;

    &:hover {
      color: #000;
    }
  }
`

@requireAuth()
class TaskListPage extends React.Component {
  state = {
    loading: true,
    topic: {},
    tasks: []
  }

  async componentWillMount() {
    this.fetchData()
  }

  fetchData = async () => {
    this.setState({
      loading: true
    })
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

  render() {
    if (this.state.loading) {
      return <div />
    }

    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h3>
              Welcome to Topic: <u>{this.state.topic.topic_name}</u> 🌙
            </h3>
            <p className="">หัวข้อนี้มีโจทย์ทั้งหมด {this.state.tasks.length} ข้อ</p>
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <div className="row">
              {this.state.tasks.map((task, index) => (
                <TaskCard className="col-12" key={index}>
                  <Link to={`/tasks/${task.pk}`}>
                    <div className="card mb-2">
                      <div className="card-body p-2">
                        <h5>{task.task_name}</h5>
                        <p className="mb-0">{task.description}</p>
                      </div>
                    </div>
                  </Link>
                </TaskCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TaskListPage
