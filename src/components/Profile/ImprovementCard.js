import React from 'react'
import Card from '../Core/Card'
import moment from 'moment'

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import UserService from '../../services/UserService'

import { Select } from 'antd'
import TopicService from '../../services/TopicService'
const Option = Select.Option

function shiftDate(date, numDays) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + numDays)
  return newDate
}

export default class ImprovementCard extends React.Component {
  state = {
    data: [],
    topics: [],
    topicSelected: 'all'
  }

  async componentWillMount() {
    const today = moment(shiftDate(moment(), 1)).format('YYYY-MM-DD')
    const startDate = moment(shiftDate(moment(), -20)).format('YYYY-MM-DD')
    let topics = await TopicService.getAllTopic().then(resp => resp.data)
    let data = await UserService.getSkillImprovement(startDate, today).then(resp => resp.data)
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
      data = await UserService.getSkillImprovement(startDate, today).then(resp => resp.data)
    } else {
      data = await UserService.getSkillImprovement(startDate, today, value).then(resp => resp.data)
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
            <XAxis dataKey="date" />
            <YAxis />
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
