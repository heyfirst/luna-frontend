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
const Filter = styled.div`
    border-radius: 0.625rem;
`

@requireAuth()
class TaskListPage extends React.Component {
  state = {
    loading: true,
    topic: {},
    tasks: [],
    level: ["Beginner", "Intermediate", "Advance"],
    solve: ["Solved", "Unsolved"],
    levelresult: "",
    solveresult: "",
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
      loading: false,
    })
  }

  // ส่วนของตัว filter
  filter = () => (
    <Filter className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">Difficulty</h5>
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-11">
            {this.state.level.map((level) => (
              <div className="custom-control custom-radio">
                <input className="custom-control-input" type="radio" name="difficulty" id={level} value={level} onChange={this.filterLevel} />
                <label className="custom-control-label" htmlFor={level}>
                  {level}
                </label>
              </div>
            ))}
          </div>
        </div>
        <h5 className="card-title mt-1">Status</h5>
        <div className="row">
          <div className="col-sm-1"></div>
          <div className="col-sm-11">
            {this.state.solve.map((solve) => (
              <div className="custom-control custom-radio">
                <input className="custom-control-input" type="radio" name="status" id={solve} value={solve} onChange={this.filterLevel} />
                <label className="custom-control-label" htmlFor={solve}>
                  {solve}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Filter>
  )

  // Function Filter Level and Solved
  filterLevel = (e) => {
    let val = e.target.id
    if (val == "Beginner" || val == "Intermediate" || val == "Advance") {
      if (this.state.solveresult == "Solved" || this.state.solveresult == "Unsolved") {
        return this.setState({ levelresult: val })
      }
      else
        return this.setState({ levelresult: val, solveresult: "" })
    }
    else if (val == "Solved" || val == "Unsolved") {
      if (this.state.levelresult == "Beginner" || this.state.levelresult == "Intermediate" || this.state.levelresult == "Advance") {
        return this.setState({ solveresult: val })
      }
      else
        return this.setState({ solveresult: val, levelresult: "" })
    }
    else
      return this.setState({ levelresult: "", solveresult: "" })
  }

  //ส่วนของตัวการ์ด และ เช็คชื่อ Topic กับ Filter Level ans Solved
  card = () => (
    <div>
      {this.state.tasks.map((task, index) => (
        task.topics.map((topic) => (
          // && (this.state.solveresult == "" || (this.state.solveresult == "Solved" || this.state.solveresult == "Unsolved))"
          topic.topic.topic_name == this.state.topic.topic_name && (topic.level.level_name == this.state.levelresult || this.state.levelresult == "") ?
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
                        <span>Difficulty : {topic.level.level_name}</span>
                      </Difficulty>
                    </CardContent>
                    <div className="col-sm-2">
                      {console.log(this.state.solveresult)}
                      <h4><Solve className="badge badge-pill badge-info" > Solved </Solve></h4>
                    </div>
                  </div>
                </CardBody>
              </Link>
            </CardTask>
            : null
        ))
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