import React from 'react'

class TaskPage extends React.Component {
  render() {
    return <div>TaskPage {this.props.match.params.taskID}</div>
  }
}

export default TaskPage
