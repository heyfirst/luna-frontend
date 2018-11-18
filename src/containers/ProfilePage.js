import React from 'react'
import requireAuth from '../utils/requireAuth'
import { inject, observer } from 'mobx-react'
import Layout from '../components/Core/Layout'
import ProfileSidebar from '../components/Profile/ProfileSidebar'
import Card from '../components/Core/Card'
import Avatar from '../components/Core/Avatar'

@requireAuth()
@inject('user')
@observer
class ProfilePage extends React.Component {
  render() {
    const { user } = this.props
    return (
      <Layout>
        <div className="container mt-4">
          <div className="row">
            <div className="col-3">
              <div className="row mb-3">
                <div className="col">
                  <ProfileSidebar active={'profile'} />
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row mb-3">
                <div className="col">
                  <Card>
                    <div className="row">
                      <div className="col-12 text-center">
                        <p>ยินดีต้อนรับเข้าสู่ Luna.Codes</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <Avatar src={user.user.avatar} />
                        <h2 className="my-3">
                          สวัสดี, {user.user.first_name || '-'} {user.user.last_name || '-'} 🌙
                        </h2>
                        <h6>
                          สถานศึกษา: <u>{user.user.school || '-'}</u>
                        </h6>
                        <h6>
                          เมืองที่อยู่: <u>{user.user.city || '-'}</u>
                        </h6>
                        <h6 className="pt-2">เกี่ยวกับฉัน:</h6>
                        <p className="px-4">{user.user.bio || '-'}</p>
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

export default ProfilePage
