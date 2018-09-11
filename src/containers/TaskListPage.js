import React from 'react'

class TaskListPage extends React.Component {
  render() {
    return <div>TaskListPage {this.props.match.params.topicID}</div>
  }
}

export default TaskListPage
