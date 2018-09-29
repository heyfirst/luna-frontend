import React from 'react'
import Card from '../Core/Card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default class ImprovementCard extends React.Component {
  render() {
    const data = [...Array(30)].map(() => ({
      name: 'Page A',
      uv: getRandomInt(1000, 9000),
      pv: getRandomInt(1000, 9000),
      amt: getRandomInt(1000, 9000)
    }))

    return (
      <Card>
        <h5>Your Skill Improvement</h5>
        <hr />
        <ResponsiveContainer width="100%" aspect={4.0 / 1.2}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign={`top`} align={'left'} height={36} />
            <Line type="monotone" dataKey="pv" stroke="#47D165" />
            <Line type="monotone" dataKey="uv" stroke="#00CCE8" />
            <Line type="monotone" dataKey="amt" stroke="#FF4593" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    )
  }
}
