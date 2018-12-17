import React from 'react'
import Card from '../Core/Card'
import store from './store'
import { observer } from 'mobx-react'
import TaskItem from './TaskItem'

@observer
class ProblemList extends React.Component {
  async componentWillMount() {
    await store.fetchAllTasks()
  }

  render() {
    return (
      <Card>
        <div className="text-center">มีโจทย์ทั้งหมด {store.tasks.length} ข้อ</div>
        <div>
          {store.tasks.map(task => (
            <TaskItem
              key={task.id}
              taskID={task.id}
              name={task.task_name}
              difficult={task.main_topic.level.level_name}
              topic={task.main_topic.topic.topic_name}
            />
          ))}
        </div>
      </Card>
    )
  }
}

export default ProblemList
