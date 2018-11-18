import React from 'react'
import requireAuth from '../utils/requireAuth'
import { inject, observer } from 'mobx-react'
import Layout from '../components/Core/Layout'
import ProfileSidebar from '../components/Profile/ProfileSidebar'
import TaskItem from '../components/Task/TaskItem'
import Card from '../components/Core/Card'
import TaskService from '../services/TaskService'

@requireAuth()
@inject('user')
@observer
class ProfileSubmissionPage extends React.Component {
  state = {
    tasks: []
  }

  async componentWillMount() {
    await TaskService.getCompletedTasks().then(resp => {
      this.setState({
        tasks: resp.data
      })
    })
  }

  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <div className="row">
            <div className="col-3">
              <div className="row mb-3">
                <div className="col">
                  <ProfileSidebar active={'profile-submission'} />
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row mb-3">
                <div className="col">
                  <Card>
                    <p className="text-right">
                      มีโจทย์ทั้งหมด {this.state.tasks.length || '-'} ข้อที่ทำสำเร็จแล้ว! 🎉
                    </p>
                    {this.state.tasks.map((task, index) => (
                      <TaskItem
                        key={index}
                        taskID={task.id}
                        name={task.task_name}
                        difficult={task.main_topic.level.level_name}
                        topic={task.main_topic.topic.topic_name}
                        solved
                      />
                    ))}
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ProfileSubmissionPage
