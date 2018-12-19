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
import store from './store'
import { observer } from 'mobx-react'
import { withRouter } from 'react-static'

@withRouter
@observer
class LearningProgressCard extends React.Component {
  state = {
    data: []
  }

  async componentWillMount() {
    await store.fetchUser(this.props.match.params.id)
    let data = await UserService.getLearningProgress(store.user.username).then(resp => resp.data)
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
          <XAxis
            dataKey="topic_name"
            label={{
              value: 'หัวข้อการเรียนรู้',
              angle: 0,
              position: 'insideBottomRight',
              offset: -5
            }}
          />
          <YAxis
            label={{ value: 'จำนวนข้อ', angle: -90, position: 'insideLeft', offset: 20 }}
            type="number"
            domain={[0, 'dataMax + 5']}
          />
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

export default LearningProgressCard
