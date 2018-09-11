import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-static'

import PadlockImage from '../static/images/padlock.png'
import TopicService from '../services/TopicService'

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
  border-radius: 50%;
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

class Topic extends React.Component {
  state = {
    topics: []
  }

  async componentWillMount() {
    const topics = await TopicService.getAllTopic().then(resp => resp.data.results)
    this.setState({
      topics
    })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-10 offset-1 mt-4">
            {this.state.topics.map(topic => (
              <Link to={`/topics/${topic.pk}`} key={topic.pk}>
                <DivCard className="card w-50">
                  <div className="row">
                    <div className="col-sm-3 card-image">
                      <CardImage>
                        <picture>
                          <PictureImg
                            className="img-fluid rounded mx-auto d-block"
                            src={PadlockImage}
                          />
                        </picture>
                      </CardImage>
                    </div>
                    <CardBody className="col-sm-7 card-body">
                      <h4>{topic.topic_name}</h4>
                      <p>Lorem Ipsum is not simply random text.</p>
                      {/* <p>{props.e.description}</p> */}
                      <CardProgress className="progress">
                        <CardProgressBar percentage={`100`} className="progress-bar" />
                      </CardProgress>
                    </CardBody>
                    <CardBodyAlignCenter className="col-sm-2 card-body align-self-center">
                      <PTask className="mb-0 task">
                        {`100`}
                        /150
                      </PTask>
                    </CardBodyAlignCenter>
                  </div>
                </DivCard>
              </Link>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default Topic
