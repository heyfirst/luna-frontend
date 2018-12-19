import React from 'react'
import Card from '../Core/Card'
import moment from 'moment'

import {
  LineChart,
  Line,
  XAxis,
  Label,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import UserService from '../../services/UserService'
import TopicService from '../../services/TopicService'
import store from './store'
import { Select } from 'antd'
import { withRouter } from 'react-static'
import { observer } from 'mobx-react'

const Option = Select.Option

function shiftDate(date, numDays) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + numDays)
  return newDate
}

@withRouter
@observer
class ImprovementCard extends React.Component {
  state = {
    data: [],
    topics: [],
    topicSelected: 'all'
  }

  async componentWillMount() {
    await store.fetchUser(this.props.match.params.id)
    const today = moment(shiftDate(moment(), 0)).format('YYYY-MM-DD')
    const startDate = moment(shiftDate(moment(), -10)).format('YYYY-MM-DD')
    let topics = await TopicService.getAllTopic().then(resp => resp.data)
    let data = await UserService.getSkillImprovement(store.user.username, startDate, today).then(
      resp => resp.data
    )
    this.setState({
      data: Object.keys(data).map(key => ({
        date: moment(key).format('MMM DD'),
        ...data[key]
      })),
      topics
    })
  }

  handleSelect = async value => {
    this.setState({
      topicSelected: value
    })

    const today = moment(shiftDate(moment(), 1)).format('YYYY-MM-DD')
    const startDate = moment(shiftDate(moment(), -20)).format('YYYY-MM-DD')

    let data = []
    if (value === 'all') {
      data = await UserService.getSkillImprovement(store.user.username, startDate, today).then(
        resp => resp.data
      )
    } else {
      data = await UserService.getSkillImprovement(
        store.user.username,
        startDate,
        today,
        value
      ).then(resp => resp.data)
    }

    this.setState({
      data: Object.keys(data).map(key => ({
        date: moment(key).format('MMM DD'),
        ...data[key]
      }))
    })
  }

  render() {
    return (
      <Card>
        <div className="d-flex justify-content-between">
          <h5>พัฒนาการของการทำโจทย์</h5>
          <div>
            <Select
              value={this.state.topicSelected}
              style={{ width: 120 }}
              onChange={this.handleSelect}
            >
              <Option key={'all'} value="all">
                All Topics
              </Option>
              {this.state.topics.map(topic => (
                <Option key={topic.pk} value={topic.pk}>
                  {topic.topic_name}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <hr />
        <ResponsiveContainer width="100%" aspect={4.0 / 1.2}>
          <LineChart data={this.state.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis
              dataKey="date"
              label={{ value: 'วันที่', angle: 0, position: 'insideBottomRight', offset: -5 }}
            />
            <YAxis label={{ value: 'คะแนนสะสม', angle: -90, position: 'insideLeft', offset: 20 }} />
            <Tooltip />
            <Legend verticalAlign={`top`} align={'left'} height={36} />
            <Line type="monotone" dataKey="Beginner" stroke="#47D165" name="ระดับง่าย" />
            <Line type="monotone" dataKey="Intermediate" stroke="#00CCE8" name="ระดับปานกลาง" />
            <Line type="monotone" dataKey="Advance" stroke="#FF4593" name="ระดับยาก" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    )
  }
}

export default ImprovementCard
