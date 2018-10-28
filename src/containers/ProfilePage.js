import React from 'react'
import requireAuth from '../utils/requireAuth'
import { inject, observer } from 'mobx-react'
import Layout from '../components/Core/Layout'
import ProfileSidebar from '../components/Profile/ProfileSidebar'
import Card from '../components/Core/Card'
import { Avatar } from 'antd'

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
                        <Avatar size={128} icon="user" />
                        <h2 className="my-3">
                          สวัสดี, {user.user.first_name} {user.user.last_name} 🌙
                        </h2>
                        <h6>
                          สถานศึกษา: <u>King Mongkut's University of Technology Thonburi</u>
                        </h6>
                        <h6>
                          อีเมล: <u>firstziiz.k@gmail.com</u>
                        </h6>
                        <h6 className="pt-2">เกี่ยวกับฉัน:</h6>
                        <p className="px-4">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente velit
                          facilis quia fugit repellendus? Optio quisquam quod velit fugit, assumenda
                          nulla tenetur ipsam, aperiam blanditiis soluta distinctio maiores!
                          Perferendis, maiores!
                        </p>
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
