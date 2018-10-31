import React from 'react'
import Card from '../Core/Card'
import moment from 'moment'

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import UserService from '../../services/UserService'

function shiftDate(date, numDays) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + numDays)
  return newDate
}

export default class ImprovementCard extends React.Component {
  state = {
    data: []
  }

  async componentWillMount() {
    const today = moment(shiftDate(moment(), 1)).format('YYYY-MM-DD')
    const startDate = moment(shiftDate(moment(), -20)).format('YYYY-MM-DD')
    let data = await UserService.getSkillImprovement(startDate, today).then(resp => resp.data)

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
        <h5>Your Skill Improvement</h5>
        <hr />
        <ResponsiveContainer width="100%" aspect={4.0 / 1.2}>
          <LineChart data={this.state.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign={`top`} align={'left'} height={36} />
            <Line type="monotone" dataKey="Beginner" stroke="#47D165" />
            <Line type="monotone" dataKey="Intermediate" stroke="#00CCE8" />
            <Line type="monotone" dataKey="Advance" stroke="#FF4593" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    )
  }
}
