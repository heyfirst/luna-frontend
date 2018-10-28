import React from 'react'
import Card from '../Core/Card'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
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
        <BarChart
          width={800}
          height={250}
          data={this.state.data}
          stackOffset="sign"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="pv" fill="#8884d8" stackId="stack" />
          <Bar dataKey="uv" fill="#82ca9d" stackId="stack" />
        </BarChart>
      </Card>
    )
  }
}
