import React from 'react'
import styled from 'styled-components'

import DataTypeImage from '../../static/images/data-type.png'
import StringImage from '../../static/images/string.png'
import ArrayImage from '../../static/images/array.png'
import LoopImage from '../../static/images/loop.png'
import ConditionImage from '../../static/images/condition.png'
import DataStructureImage from '../../static/images/data-structure.png'

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

const CardImage = styled.img`
  padding: 0rem;
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

const TopicHeader = styled.div`
  color: #000;
  font-size: 1.5625rem;
`

const PTask = styled.div`
  text-align: center;
  padding-top: 3.125rem;
  padding-right: 0.9375rem;
  color: black;
`

class TopicCard extends React.Component {
  // Function คำนวณ Progressbar
  percentageCalc = (taskCount, totalTask) => {
    const total = (taskCount / totalTask) * 100
    return total
  }

  render() {
    const { topic, isTopicPage } = this.props
    return (
      <div className="row py-2">
        <div className="col-sm-3 card-image">
          <CardImage
            src={getImageFromType(topic.topic_name)}
            className="mx-auto d-block mt-2 mb-2"
            height="100"
            width="100"
          />
        </div>
        <CardBody className="col-sm-7 card-body">
          <TopicHeader className="mb-0 font-weight-bold">{topic.topic_name}</TopicHeader>
          <p>{topic.description}</p>
          {!isTopicPage && (
            <CardProgress className="progress">
              <CardProgressBar
                percentage={this.percentageCalc(topic.completed_tasks, topic.total_tasks)}
                classsName="progress-bar"
              />
            </CardProgress>
          )}
        </CardBody>
        {!isTopicPage && (
          <CardBodyAlignCenter className="col-sm-2 card-body align-self-center">
            <PTask className="mb-0 task">
              {topic.completed_tasks}/{topic.total_tasks}
            </PTask>
          </CardBodyAlignCenter>
        )}
      </div>
    )
  }
}

export default TopicCard
