import React from 'react'
import requireAuth from '../utils/requireAuth'
import { inject, observer } from 'mobx-react'
import Layout from '../components/Core/Layout'
import ProfileSidebar from '../components/Profile/ProfileSidebar'
import Card from '../components/Core/Card'
import Avatar from '../components/Core/Avatar'
import store from '../components/Profile/store'
import { withRouter } from 'react-static'

@withRouter
@requireAuth()
@inject('user')
@observer
class ProfilePage extends React.Component {
  state = {
    user: {}
  }
  async componentWillMount() {
    if (!this.props.match.params.id) {
      this.props.history.replace(`/profile/${this.props.user.user.username}`)
    } else {
      await store.fetchUser(this.props.match.params.id)
      this.setState({ user: store.user })
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (!nextProps.match.params.id) {
      this.props.history.replace(`/profile/${this.props.user.user.username}`)
    } else {
      await store.fetchUser(nextProps.match.params.id)
      this.setState({ user: store.user })
    }
  }

  render() {
    const { user } = this.state
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
                        <Avatar src={user.avatar} />
                        <h2 className="my-3">
                          สวัสดี, {user.first_name || '-'} {user.last_name || '-'} 🌙
                        </h2>
                        <h6>
                          สถานศึกษา: <u>{user.school || '-'}</u>
                        </h6>
                        <h6>
                          เมืองที่อยู่: <u>{user.city || '-'}</u>
                        </h6>
                        <h6 className="pt-2">เกี่ยวกับฉัน:</h6>
                        <p className="px-4">{user.bio || '-'}</p>
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
