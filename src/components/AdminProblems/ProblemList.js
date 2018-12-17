import React from 'react'
import Card from '../Core/Card'
import store from './store'
import { observer } from 'mobx-react'
import TaskItem from './TaskItem'
import { Select } from 'antd'

const { Option } = Select

@observer
class ProblemList extends React.Component {
  async componentWillMount() {
    await store.initialData()
    await store.fetchAllTasks()
  }

  render() {
    if (store.loading) {
      return <div />
    }

    return (
      <Card>
        <div className="text-center mb-2">มีโจทย์ทั้งหมด {store.tasks.length} ข้อ</div>
        <div className="row mb-2">
          <div className="col">
            <div className="form-group">
              <label htmlFor="">หัวข้อการเรียนรู้</label>
              <Select
                value={store.filter.topic}
                style={{ width: '100%' }}
                onChange={value => store.setFilter('topic', value)}
              >
                <Option value={'All'}>{'ทุกหัวข้อการเรียนรู้'}</Option>
                {store.topics.map(topic => (
                  <Option key={topic.pk} value={topic.pk}>
                    {topic.topic_name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="">ระดับความยาก</label>
              <Select
                value={store.filter.level}
                style={{ width: '100%' }}
                onChange={value => store.setFilter('level', value)}
              >
                <Option value={'All'}>{'ทุกระดับความยาก'}</Option>
                {store.levels.map(level => (
                  <Option key={level.pk} value={level.pk}>
                    {level.level_name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="">หมวดหมู่</label>
              <Select
                value={store.filter.task_type}
                style={{ width: '100%' }}
                onChange={value => store.setFilter('task_type', value)}
              >
                <Option value={'All'}>ทุกหมวดหมู่</Option>
                <Option value={'PRACTICE'}>ฝึกฝน</Option>
                <Option value={'CHALLENGE'}>รวมโจทย์</Option>
              </Select>
            </div>
          </div>
        </div>
        <div>
          {store.tasks.map(task => (
            <TaskItem
              key={task.id}
              taskID={task.id}
              name={task.task_name}
              difficult={task.main_topic.level.level_name}
              topic={task.main_topic.topic.topic_name}
              order={task.order}
            />
          ))}
        </div>
      </Card>
    )
  }
}

export default ProblemList
