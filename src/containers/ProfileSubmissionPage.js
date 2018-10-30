import React from 'react'
import requireAuth from '../utils/requireAuth'
import { inject, observer } from 'mobx-react'
import Layout from '../components/Core/Layout'
import ProfileSidebar from '../components/Profile/ProfileSidebar'
import TaskItem from '../components/Task/TaskItem'
import Card from '../components/Core/Card'

@requireAuth()
@inject('user')
@observer
class ProfileSubmissionPage extends React.Component {
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
                    <p className="text-right">มีโจทย์ทั้งหมด 9 ข้อที่ทำสำเร็จแล้ว! 🎉</p>
                    {[...Array(3)].map((_, index) => (
                      <TaskItem
                        key={index}
                        name="Lorem..."
                        difficult={`Beginner`}
                        topic={`String`}
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
