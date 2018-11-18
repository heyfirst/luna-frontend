import React from 'react'
import Card from '../Core/Card'
import {
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
        <h5>ความก้าวหน้าของการฝึกฝน</h5>
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
          <Bar dataKey="Beginner" fill="#47D1A8" stackId="stack" unit={` ข้อ`} name="ระดับง่าย" />
          <Bar
            dataKey="Intermediate"
            fill="#00CCE8"
            stackId="stack"
            unit={` ข้อ`}
            name="ระดับปานกลาง"
          />
          <Bar dataKey="Advance" fill="#FF73AE" stackId="stack" unit={` ข้อ`} name="ระดับยาก" />
        </BarChart>
      </Card>
    )
  }
}
