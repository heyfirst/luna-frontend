import React from 'react'
import requireAuth from '../utils/requireAuth'

@requireAuth()
class TaskPage extends React.Component {
  render() {
    return <div>TaskPage {this.props.match.params.taskID}</div>
  }
}

export default TaskPage
