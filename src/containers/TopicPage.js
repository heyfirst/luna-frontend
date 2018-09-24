import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-static'

import PadlockImage from '../static/images/padlock.png'
import TopicService from '../services/TopicService'
import requireAuth from '../utils/requireAuth'

const DivCard = styled.div`
  margin-bottom: 1.4375rem;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4.9375rem !important;
`

const DivCardInline = styled.div`
  margin-bottom: 1.4375rem;
  width: 49%;
  margin-left: 0.1875rem;
  margin-right: 0.1875rem;
  border-radius: 4.9375rem !important;
`

const CardImage = styled.div`
  background-color: #f2994a;
  padding: 0rem;
  max-width: 100%;
  min-width: 100%;
  max-height: 100%;
  min-height: 100%;
  border-radius: 4.9375rem !important;
`

const CardBody = styled.div`
  color: black;
  padding-right: 0.3125rem !important;
  padding-left: 0.3125rem !important;
`

const CardProgress = styled.div`
  height: 0.625rem !important;
`

const CardProgressBar = styled.div`
  width: ${({ percentage }) => `${percentage}%`};
  background-color: #47c9d1 !important;
`

const CardBodyAlignCenter = styled.div`
  padding-left: 0rem !important;
  padding-bottom: 0rem !important;
`

const PictureImg = styled.img`
  padding-top: 1.5625rem;
  width: 4.375rem;
  height: 5.9375rem;
  z-index: 100;
`

const ImgHidden = styled.div`
  width: 4.375rem;
  height: 5.9375rem;
  visibility: hidden;
`

const PTask = styled.div`
  text-align: center;
  padding-top: 3.125rem;
  padding-right: 0.9375rem;
  color: black;
`

@requireAuth()
class Topic extends React.Component {
  state = {
    topics: [],
    userScore: {}
  }

  async componentWillMount() {
    const topics = await TopicService.getAllTopic().then(resp => resp.data.results)
    const userScore = 99 // Mock Data userScore
    this.setState({
      topics,
      userScore
    })
  }

  // Function คำนวณ Progressbar
  percentageCalc = (taskCount, totalTask) => {
    const total = (taskCount / totalTask) * 100
    return total
  }

  // Function เช็ค topic_name ที่เป็นไลน์เดียวกัน
  isMustShowInline = topic => {
    return topic.topic_name === 'Loop' || topic.topic_name === 'Condition'
  }

  // Function เช็ค Score ของ User เกินเกณฑ์หรือไม่
  isScoreOverNinetyNine = topic => {
    return topic.pk > 0 && topic.pk <= this.state.userScore && this.state.userScore > 99 //Mock เกณฑ์ Score
  }

  // ส่วนของตัวการ์ด
  Card = (topic, percentage) => {
    return (
      <div className="row">
        <div className="col-sm-3 card-image">
          <CardImage>
            {this.isScoreOverNinetyNine(topic) || topic.pk === 1 ? (
              <ImgHidden />
            ) : (
              <picture>
                <PictureImg className="img-fluid rounded mx-auto d-block" src={PadlockImage} />
              </picture>
            )}
          </CardImage>
        </div>
        <CardBody className="col-sm-7 card-body">
          <h4>{topic.topic_name}</h4>
          <p>Lorem Ipsum is not simply random text.</p>
          <CardProgress className="progress">
            <CardProgressBar percentage={percentage} className="progress-bar" />
          </CardProgress>
        </CardBody>
        <CardBodyAlignCenter className="col-sm-2 card-body align-self-center">
          <PTask className="mb-0 task">
            {this.state.userScore}
            /150 {/* Mock คะแนนเต็มของ topic*/}
          </PTask>
        </CardBodyAlignCenter>
      </div>
    )
  }

  // Function เช็ค Card ไหนต้องส้ราง Link
  linkCard = (topic, percentage) => (
    <div>
      {this.isScoreOverNinetyNine(topic) || topic.pk === 1 ? (
        <Link to={`/topics/${topic.pk}`} key={topic.pk}>
          {this.Card(topic, percentage)}
        </Link>
      ) : (
        this.Card(topic, percentage)
      )}
    </div>
  )

  // Function เช็ค Topic ไหนเป็นไลน์เดียวกัน
  topicsInline = () => {
    return this.state.topics.map(topic => {
      const percentage = this.percentageCalc(100, 150)
      if (this.isMustShowInline(topic)) {
        return (
          <DivCardInline className="card d-inline-flex">
            {this.linkCard(topic, percentage)}
          </DivCardInline>
        )
      } else {
        return (
          <DivCard className="card w-50" key={topic.pk}>
            {this.linkCard(topic, percentage)}
          </DivCard>
        )
      }
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-10 offset-1 mt-4">{this.topicsInline()}</div>
        </div>
      </div>
    )
  }
}

export default Topic
