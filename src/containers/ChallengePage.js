import React from 'react'

import requireAuth from '../utils/requireAuth'
import Layout from '../components/Core/Layout'
import Card from '../components/Core/Card'
import TaskItem from '../components/Task/TaskItem'
import FilterSidebar from '../components/Challenge/FilterSidebar'
import ChallengeService from '../services/ChallengeService'

@requireAuth()
class ChallengePage extends React.Component {
  state = {
    tasks: []
  }

  componentDidMount() {
    ChallengeService.getAllTask().then(resp => {
      this.setState({ tasks: resp.data })
    })
  }

  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <div className="row">
            <div className="col-3">
              <FilterSidebar />
            </div>
            <div className="col-9">
              <Card>
                <p className="text-right">มีโจทย์ทั้งหมด 9 ข้อ</p>
                {this.state.tasks.map((task, index) => (
                  <TaskItem
                    key={index}
                    taskID={task.id}
                    name={task.task_name}
                    difficult={task.main_topic.level.level_name}
                    topic={task.main_topic.topic.topic_name}
                    solved={true}
                  />
                ))}
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ChallengePage
