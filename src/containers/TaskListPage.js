import React from 'react'
import styled from 'styled-components'
import requireAuth from '../utils/requireAuth'
import TopicService from '../services/TopicService'
import { Link } from 'react-static'
import Layout from '../components/Core/Layout'

import DataTypeImage from '../static/images/data-type.png'
import StringImage from '../static/images/string.png'
import ArrayImage from '../static/images/array.png'
import LoopImage from '../static/images/loop.png'
import ConditionImage from '../static/images/condition.png'
import DataStructureImage from '../static/images/data-structure.png'

const getImageFromType = type => {
  switch (type) {
    case 'Data Type':
      return DataTypeImage
    case 'String':
      return StringImage
    case 'Array':
      return ArrayImage
    case 'Loop':
      return LoopImage
    case 'Condition':
      return ConditionImage
    case 'Data Structure':
      return DataStructureImage
  }
}

const CardTask = styled.div`
  border-radius: 0.9375rem !important;
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
  border: 0.0625rem solid #7498E9;
  color: #7498E9;
  font-size: 1rem;
  margin-top: 0.725rem;
  margin-left: 1rem;
`
const Solved = styled.div`
  background-color: #7498E9 !important;
  border: 0.0625rem solid #7498E9;
  color: #fff;
  font-size: 1rem;
  margin-top: 0.725rem;
  margin-left: 1rem;
`
const SpanDiff = styled.span`
  font-size: 0.875rem;
`
const TopicImage = styled.img`
  filter: drop-shadow(0rem 0.5rem 0.25rem rgba(0, 0, 0, 0.1));
`
const BGColor = styled.div`
  width: 100%;
  height: 15.5rem;
  background-color: #29406B; 
  margin: 0;
  padding: 0;
`
const Header = styled.div`
  color: #fff;
  font-size: 1.875rem;
`
const SubHeader = styled.div`
  color: #fff;
  font-size: 1rem;
`
const Lock = styled.div`
  position: absolute;
  background-color: #29406B; 
  width: 100%; 
  height: 100%; 
  z-index: 99;
  border-radius: 0.9375rem;
  opacity: 0.8;
`

// @requireAuth()
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
      resp => resp.data.results
    )

    this.setState({
      topic,
      tasks,
      loading: false
    })
  }

  // Fuction Solved or Solve
  solve = () => {
    let a = true
    if (a == true) {
      return (
        <Solve className="badge badge-pill font-weight-normal"> Solve </Solve>
      )
    } else {
      return (
        <Solved className="badge badge-pill font-weight-normal"> Solved </Solved>
      )
    }
  }

  // ส่วนของตัวการ์ด Tasks
  card = (tasks) => (
    <CardBody className="card-body">
      <div className="row">
        <CardContent className="col-sm-10 pl-5">
          <h6 className="mb-2 font-weight-bold"> {tasks.task_name} </h6>
          <Difficulty className="card-text">
            <SpanDiff>Difficulty : {tasks.main_topic.level.level_name}</SpanDiff>
          </Difficulty>
        </CardContent>
        <div className="col-sm-2">
          {this.solve()}
        </div>
      </div>
    </CardBody>
  )

  // Function เช็ค Card ไหนต้องส้ราง Link
  linkCard = (tasks) => {
    let a = true
    if (a == true) {
      return (
        <Link to={`/tasks/${tasks.pk}`}>
          {this.card(tasks)}
        </Link>
      )
    } else {
      return (
        <div>
          <Lock />
          {this.card(tasks)}
        </div>
      )
    }
  }

  cardTasks = () => (
    <div>
      {this.state.tasks.map((tasks, index) => (
        tasks.main_topic && tasks.main_topic.topic.topic_name == this.state.topic.topic_name ? (
          <CardTask key={index} className="card mt-3">
            {this.linkCard(tasks)}
          </CardTask>
        ) : null
      ))}
    </div>
  )

  render() {
    if (this.state.loading) {
      return <div />
    }

    return (
      <Layout>
        <BGColor>
          <div className="container-fluid mb-5">
            <div className="row">
              <div className="col-sm-3"></div>
              <div className="col-sm-6 mt-4 mb-3">
                <div className="row mb-2">
                  <div className="col-sm-2"></div>
                  <div className="col-sm-3 pr-1">
                    <TopicImage src={getImageFromType(this.state.topic.topic_name)} height="150" width="150" className="rounded" />
                  </div>
                  <div className="col-sm-5 pt-5 pl-1">
                    <Header className="mb-0 font-weight-bold">{this.state.topic.topic_name}</Header>
                    <SubHeader>Lorem Ipsum is not simply random text.</SubHeader>
                  </div>
                  <div className="col-sm-2"></div>
                </div>
              </div>
              <div className="col-sm-3"></div>
            </div>
            <div className="row mb-4">
              <div className="col-sm-3" />
              <div className="col-sm-6">{this.cardTasks()}</div>
              <div className="col-sm-3" />
            </div>
          </div>
        </BGColor>
      </Layout>
    )
  }
}

export default TaskListPage
