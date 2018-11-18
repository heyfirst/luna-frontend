import React from 'react'
import { observer } from 'mobx-react'
import ChallangeStore from '../components/Challenge/store'

import requireAuth from '../utils/requireAuth'
import Layout from '../components/Core/Layout'
import Card from '../components/Core/Card'
import TaskItem from '../components/Task/TaskItem'
import FilterSidebar from '../components/Challenge/FilterSidebar'

@requireAuth()
@observer
class ChallengePage extends React.Component {
  state = {
    tasks: []
  }

  async componentDidMount() {
    await ChallangeStore.getChallange()
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
                <p className="text-right">
                  มีโจทย์ทั้งหมด {ChallangeStore.tasks.length || '-'} ข้อ
                </p>
                {ChallangeStore.tasks.map((task, index) => (
                  <TaskItem
                    key={index}
                    taskID={task.id}
                    name={task.task_name}
                    difficult={task.main_topic.level.level_name}
                    topic={task.main_topic.topic.topic_name}
                    solved={task.answered}
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
