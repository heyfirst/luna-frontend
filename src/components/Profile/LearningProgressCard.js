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

const data = [
  { subject: 'Math', A: 20 },
  { subject: 'Chinese', A: 38 },
  { subject: 'English', A: 20 },
  { subject: 'Geography', A: 2 },
  { subject: 'Physics', A: 7 },
  { subject: 'History', A: 55 }
]

export default class LearningProgressCard extends React.Component {
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
          <RadarChart outerRadius={100} data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 60]}
              tickCount={4}
              tickFormatter={tick => this.changeTickToText(tick)}
            />
            <Radar name="Mike" dataKey="A" stroke="#00C0CC" fill="#00C0CC" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </Card>
    )
  }
}
