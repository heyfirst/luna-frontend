import React from 'react'
import Card from '../Core/Card'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts'
import UserService from '../../services/UserService'

export default class LearningProgressCard extends React.Component {
  state = {
    data: []
  }

  async componentWillMount() {
    let data = await UserService.getLearningProgress().then(resp => resp.data)

    this.setState({
      data: Object.keys(data).map(key => data[key])
    })
  }

  changeTickToText = tick => {
    if (tick === 20) return 'Beginner'
    if (tick === 40) return 'Intermediate'
    if (tick === 60) return 'Advance'
    return null
  }

  render() {
    return (
      <Card>
        <h5>Your Learning Progress</h5>
        <hr />
        <ResponsiveContainer width="100%" aspect={4.0 / 2.5}>
          <RadarChart outerRadius={100} data={this.state.data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="topic_name" />
            <PolarRadiusAxis
              domain={[0, 60]}
              tickCount={4}
              angle={90}
              tickFormatter={tick => this.changeTickToText(tick)}
            />
            <Radar dataKey="stats" stroke="#00C0CC" fill="#00C0CC" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </Card>
    )
  }
}
