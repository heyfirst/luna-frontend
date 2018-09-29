import React from 'react'
import Card from '../Core/Card'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import ReactTooltip from 'react-tooltip'

let today = new Date()

const randomValues = getRange(200).map(index => {
  return {
    date: shiftDate(today, -index),
    count: getRandomInt(1, 3)
  }
})

function shiftDate(date, numDays) {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + numDays)
  return newDate
}

function getRange(count) {
  return Array.from({ length: count }, (_, i) => i)
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default class CalendarHeatmapCard extends React.Component {
  render() {
    return (
      <Card>
        <h5>Your Frequency practics</h5>
        <hr />
        <CalendarHeatmap
          startDate={shiftDate(today, -250)}
          endDate={today}
          values={randomValues}
          classForValue={value => {
            if (!value) {
              return 'color-empty'
            }
            return `color-github-${value.count}`
          }}
          tooltipDataAttrs={value => {
            return {
              'data-tip': `task completed: ${value.count}`
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
