import React from 'react'
import styled from 'styled-components'
import requireAuth from '../utils/requireAuth'
import TopicService from '../services/TopicService'
import { Link } from 'react-static'

// const TaskCard = styled.div`
//   a {
//     color: #666;
//     transition: all 0.3s;

//     &:hover {
//       color: #000;
//     }
//   }
// `
const CardTask = styled.div`
    border-radius: 3.75rem !important;
`

const CardBody = styled.div`
    padding: 0.25rem !important;
`
const CardContent = styled.div`
    padding-left: 1.625rem !important;
    color: #00C0CC;
`
const Difficulty = styled.div`
    display: inline ;
    color: black;
`
const Solve = styled.div`
    margin-top: 1rem;
    background-color: #00C0CC !important;
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
    const { match } = this.props
    const topic = await TopicService.getTopic(match.params.topicID).then(resp => resp.data)
    const tasks = await TopicService.getTaskFromTopicID(match.params.topicID).then(
      resp => resp.data
    )
    this.setState({
      loading: true,
      topic,
      tasks,
      loading: false
    })
  }

  filter = () => (
    <div className="card mt-3" style={{borderRadius: `0.625rem`}}>
      <div className="card-body">
        <h5 className="card-title">Difficulty</h5>
        <form>
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-11">
              <div className="custom-control custom-radio">
                <input className="custom-control-input" type="radio" name="difficulty" id="basic" value="basic" />
                <label className="custom-control-label" htmlFor="basic">
                  Basic
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input className="custom-control-input" type="radio" name="difficulty" id="intermediately" value="intermediately" />
                <label className="custom-control-label" htmlFor="intermediately">
                  Intermediately
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input className="custom-control-input" type="radio" name="difficulty" id="advance" value="advance" />
                <label className="custom-control-label" htmlFor="advance">
                  Advance
                </label>
              </div>
            </div>
          </div>
        </form>
        <h5 className="card-title">Status</h5>
        <form>
          <div className="row">
            <div className="col-sm-1"></div>
            <div className="col-sm-11">
              <div className="custom-control custom-radio">
                <input className="custom-control-input" type="radio" name="status" id="solved" value="solved" />
                <label className="custom-control-label" htmlFor="solved">
                  Solved
                </label>
              </div>
              <div className="custom-control custom-radio">
                <input className="custom-control-input" type="radio" name="status" id="unsolved" value="unsolved" />
                <label className="custom-control-label" htmlFor="unsolved">
                  Unsolved
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )

  card = () => (
    <div>
      {this.state.tasks.map((task, index) => (
        <CardTask className="card mt-3">
          <Link to={`/tasks/${task.pk}`} key={index}>
            <CardBody className="card-body">
              <div className="row">
                <div className="col-sm-1">
                  <img src="http://placehold.it/60x60" className="rounded-circle" />
                </div>
                <CardContent className="col-sm-9">
                  <h5 className="card-title"> {task.task_name} </h5>
                  <Difficulty className="card-text">
                    {task.topics.map((topic) => (
                      topic.topic.topic_name == this.state.topic.topic_name ?
                        <span>Difficulty : {topic.level.level_name}</span> : null
                    ))}
                  </Difficulty>
                </CardContent>
                <div className="col-sm-2">
                  <h4><Solve className="badge badge-pill badge-info" > Solved </Solve></h4>
                </div>
              </div>
            </CardBody>
          </Link>
        </CardTask>
      ))}
    </div>
  )

  render() {
    if (this.state.loading) {
      return <div />
    }

    return (
      <div className="container-fluid mt-4 mb-3">
        <center>
          <h3> Welcome to Topic: <u>{this.state.topic.topic_name}</u> 🌙 </h3>
          <p className="">หัวข้อนี้มีโจทย์ทั้งหมด {this.state.tasks.length} ข้อ</p>
        </center>
        <div className="row">
          <div className="col-sm-2"></div>
          <div className="col-sm-2">
            {this.filter()}
          </div>
          <div className="col-sm-6">
            {this.card()}
          </div>
          <div className="col-sm-2"></div>
        </div>
      </div>
    )
  }
}

export default TaskListPage