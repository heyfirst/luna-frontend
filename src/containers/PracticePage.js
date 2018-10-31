import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-static'

import Padlock from '../static/images/padlock.png'

import TopicService from '../services/TopicService'
import requireAuth from '../utils/requireAuth'
import Layout from '../components/Core/Layout'
import TopicCard from '../components/Topic/TopicCard'

const DivCard = styled.div`
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.625rem !important;
  margin-bottom: 1.25rem;
  filter: drop-shadow(0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.1));
`

const Lock = styled.div`
  position: absolute;
  background-color: #29406b;
  width: 100%;
  height: 100%;
  z-index: 99;
  border-radius: 0.625rem;
  opacity: 0.8;
`

const LockImage = styled.img`
  position: absolute;
  margin: auto;
  z-index: 100;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`

@requireAuth()
class Topic extends React.Component {
  state = {
    topics: [],
    userScore: {}
  }

  async componentWillMount() {
    const topics = await TopicService.getAllTopic().then(resp => resp.data)
    const userScore = 99 // Mock Data userScore
    this.setState({
      topics,
      userScore
    })
  }

  // Function เช็ค Score ของ User เกินเกณฑ์หรือไม่
  isScoreOverNinetyNine = topic => {
    return topic.pk > 0 && topic.pk <= this.state.userScore && this.state.userScore > 99 //Mock เกณฑ์ Score
  }

  render() {
    return (
      <Layout>
        <div className="container-fluid">
          <div className="row mb-5">
            <div className="col-sm-10 offset-1 mt-4">
              {this.state.topics.map(topic => (
                <DivCard className="card w-50 border-0" key={topic.pk}>
                  <Link to={`/practice/${topic.pk}`} key={topic.pk}>
                    <TopicCard topic={topic} />
                  </Link>
                </DivCard>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Topic
