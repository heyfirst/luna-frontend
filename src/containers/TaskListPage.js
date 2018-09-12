import React from 'react'
import requireAuth from '../utils/requireAuth'

@requireAuth()
class TaskListPage extends React.Component {
  render() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h2>Welcome to Topic {this.props.match.params.topicID} 🌙</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default TaskListPage
