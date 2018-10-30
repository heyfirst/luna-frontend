import React from 'react'
import requireAuth from '../utils/requireAuth'
import { inject, observer } from 'mobx-react'
import Layout from '../components/Core/Layout'
import ProfileSidebar from '../components/Profile/ProfileSidebar'
import { Card, Avatar } from 'antd'

@requireAuth()
@inject('user')
@observer
class ProfileEditPage extends React.Component {
  render() {
    const { user } = this.props
    return (
      <Layout>
        <div className="container mt-4">
          <div className="row">
            <div className="col-3">
              <div className="row mb-3">
                <div className="col">
                  <ProfileSidebar active={'profile-edit'} />
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row mb-3">
                <div className="col">
                  <Card>
                    <div className="row">
                      <div className="col-12">
                        <h2 className="my-3">แก้ไขข้อมูลส่วนตัว</h2>
                        <div className="text-center">
                          <Avatar size={128} icon="user" />
                        </div>
                        <div className="form-group">
                          <label>อีเมล:</label>
                          <input type="text" className="form-control" readOnly />
                        </div>
                        <div className="form-group">
                          <label>ชื่อจริง:</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>นามสกุล:</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>สถานศึกษา:</label>
                          <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                          <label>เกี่ยวกับฉัน:</label>
                          <textarea type="text" className="form-control" />
                        </div>
                        <button className="btn btn-luna btn-block">อัพเดทข้อมูล</button>
                      </div>
                    </div>
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

export default ProfileEditPage
