import React from 'react'
import Card from '../Core/Card'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import ReactTooltip from 'react-tooltip'
import UserService from '../../services/UserService'
import { observer } from 'mobx-react'
import { withRouter } from 'react-static'
import store from './store'

let today = new Date()

const getLastday = today => {
  let day = today.getDay() + 1

  return -7 * 50 - day
}

function shiftDate(date, numDays) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + numDays)
  return newDate
}

@withRouter
@observer
class CalendarHeatmapCard extends React.Component {
  state = {
    data: []
  }

  getFrequencyData = () => {
    return this.state.data.map(data => ({
      date: data.day,
      count: data.total
    }))
  }

  async componentWillMount() {
    await store.fetchUser(this.props.match.params.id)
    let data = await UserService.getFrequencyPractics(store.user.username).then(resp => resp.data)
    this.setState({
      data
    })
  }

  render() {
    return (
      <Card>
        <h5>ความถี่ในการทำโจทย์</h5>
        <hr />
        <CalendarHeatmap
          startDate={shiftDate(today, getLastday(today))}
          endDate={today}
          values={this.getFrequencyData()}
          classForValue={value => {
            if (!value) {
              return 'color-empty'
            }
            return `color-github-${value.count < 4 ? value.count : 4}`
          }}
          tooltipDataAttrs={value => {
            return {
              'data-tip': `วันที่ x | ทำสำเร็จทั้งหมด: ${value.count || '0'} ข้อ`
            }
          }}
          showWeekdayLabels
        />
        <ReactTooltip />
      </Card>
    )
  }
}

export default CalendarHeatmapCard
