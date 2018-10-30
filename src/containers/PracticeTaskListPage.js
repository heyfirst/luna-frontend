import React from 'react'
import styled from 'styled-components'
import requireAuth from '../utils/requireAuth'
import TopicService from '../services/TopicService'
import { Link } from 'react-static'
import Layout from '../components/Core/Layout'

import TopicCard from '../components/Topic/TopicCard'
import TaskItem from '../components/Task/TaskItem'
import Card from '../components/Core/Card'

const DivCard = styled.div`
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.625rem !important;
  margin-bottom: 1.25rem;
  filter: drop-shadow(0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.1));
`

const CardBody = styled.div`
  padding: 0.5rem !important;
`
const CardContent = styled.div`
  color: #00c0cc;
`
const Difficulty = styled.div`
  color: black;
  display: inline;
`
const Solve = styled.div`
  background-color: #fff !important;
  border: 0.0625rem solid #7498e9;
  color: #7498e9;
  font-size: 1rem;
  margin-top: 0.725rem;
  margin-left: 1rem;
`

const Solved = styled.div`
  background-color: #7498e9 !important;
  border: 0.0625rem solid #7498e9;
  color: #fff;
  font-size: 1rem;
  margin-top: 0.725rem;
  margin-left: 1rem;
`

const Locked = styled.div`
  background-color: #fff !important;
  border: 0.0625rem solid #666;
  color: #666;
  font-size: 1rem;
  margin-top: 0.725rem;
  margin-left: 1rem;
`

const SpanDiff = styled.span`
  font-size: 0.875rem;
`

const Lock = styled.div`
  position: absolute;
  background-color: #29406b;
  width: 100%;
  height: 100%;
  z-index: 99;
  border-radius: 0.9375rem;
  opacity: 0.8;
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

  // Fuction Solved or Solve
  solve = (answered, isLock) => {
    if (answered) {
      return <Solved className="badge badge-pill font-weight-normal"> Solved </Solved>
    } else if (isLock) {
      return <Locked className="badge badge-pill font-weight-normal"> Lock </Locked>
    } else {
      return <Solve className="badge badge-pill font-weight-normal"> Solve </Solve>
    }
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
          {/* <CardBody className="card-body">
            <div className="row">
              <CardContent className="col-sm-10 pl-5">
                <h6 className="mb-2 font-weight-bold"> {tasks.task_name} </h6>
                <Difficulty className="card-text">
                  <SpanDiff>Difficulty : {tasks.main_topic.level.level_name}</SpanDiff>
                </Difficulty>
              </CardContent>
              <div className="col-sm-2">{this.solve(tasks.answered, isLock)}</div>
            </div>
          </CardBody> */}
        </Link>
      )
    } else {
      return (
        <div>
          <Lock />
          <CardBody className="card-body">
            <div className="row">
              <CardContent className="col-sm-10 pl-5">
                <h6 className="mb-2 font-weight-bold"> {tasks.task_name} </h6>
                <Difficulty className="card-text">
                  <SpanDiff>Difficulty : {tasks.main_topic.level.level_name}</SpanDiff>
                </Difficulty>
              </CardContent>
              <div className="col-sm-2">{this.solve(tasks.answered, isLock)}</div>
            </div>
          </CardBody>
        </div>
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
                  <div className="card-header">โจทย์ระดับง่าย</div>
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
