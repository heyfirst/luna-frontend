import React from 'react'
import Card from '../Core/Card'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import ReactTooltip from 'react-tooltip'
import UserService from '../../services/UserService'

let today = new Date()

function shiftDate(date, numDays) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + numDays)
  return newDate
}

export default class CalendarHeatmapCard extends React.Component {
  state = {
    data: []
  }

  getFrequencyData = () => {
    return this.state.data.map(data => {
      return {
        date: data.day,
        count: data.total
      }
    })
  }

  async componentWillMount() {
    let data = await UserService.getFrequencyPractics().then(resp => resp.data)

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
          startDate={shiftDate(today, -300)}
          endDate={today}
          values={this.getFrequencyData()}
          classForValue={value => {
            if (!value) {
              return 'color-empty'
            }
            return `color-github-${value.count}`
          }}
          tooltipDataAttrs={value => {
            return {
              'data-tip': `Task completed: ${value.count || '-'}`
            }
          }}
          showWeekdayLabels
          onClick={value => alert(`Clicked on value with count: ${value.count}`)}
        />
        <ReactTooltip />
      </Card>
    )
  }
}
