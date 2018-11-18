import React from 'react'
import requireAuth from '../utils/requireAuth'
import { inject, observer } from 'mobx-react'
import Layout from '../components/Core/Layout'
import ProfileSidebar from '../components/Profile/ProfileSidebar'
import { Icon, Card, notification, message } from 'antd'
import UserService from '../services/UserService'
import Avatar from '../components/Core/Avatar'

@requireAuth()
@inject('user')
@observer
class ProfileEditPage extends React.Component {
  state = {
    loading: false,
    avatar: this.props.user.user.avatar,
    firstName: this.props.user.user.first_name,
    lastName: this.props.user.user.last_name,
    school: this.props.user.user.school,
    city: this.props.user.user.city,
    bio: this.props.user.user.bio
  }

  onSubmit = async e => {
    e.preventDefault()
    await UserService.updateProfile(this.state).then(resp => {
      notification['success']({
        message: 'อัพเดทข้อมูลสำเร็จ',
        description: 'อัพเดทข้อมูลส่วนตัวสำเร็จแล้ว'
      })
      this.props.user.getProfile()
    })
  }

  handleUpload = async e => {
    e.persist()
    const file = e.target.files[0]

    const data = new FormData()
    data.append('avatar', file)

    this.setState({
      loading: true,
      avatar: null
    })

    message.loading('กำลังอัพโหลดรูปของคุณ...')

    const avatar = await UserService.uploadAvatar(data).then(resp => resp.data.avatar)

    this.setState({
      loading: false,
      avatar
    })

    message.success('อัพโหลดเรียบร้อย!')
    this.props.user.getProfile()
  }

  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <div className="row">
            <div className="col-3">
              <div className="row mb-3">
                <div className="col">
                  <ProfileSidebar active={'profile-edit'} />
                  />
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row mb-3">
                <div className="col">
                  <Card>
                    <div className="row">
                      <div className="col-12">
                        <form onSubmit={e => this.onSubmit(e)}>
                          <h2 className="my-3">แก้ไขข้อมูลส่วนตัว</h2>
                          <div className="text-center">
                            <Avatar src={this.state.avatar} />
                            <div className="mt-2">
                              <input
                                type="file"
                                id="upload-file"
                                className="d-none"
                                onChange={e => this.handleUpload(e)}
                              />
                              <button
                                className="btn btn-luna"
                                type="button"
                                loading={this.state.loading ? 'true' : 'false'}
                                onClick={() => {
                                  document.getElementById('upload-file').click()
                                }}
                              >
                                <Icon type="upload" />{' '}
                                {this.state.loading ? 'กำลังอัพโหลด' : 'อัพโหลด'}
                              </button>
                            </div>
                          </div>
                          <div className="form-group">
                            <label>ชื่อจริง:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={this.state.firstName}
                              onChange={e => this.setState({ firstName: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>นามสกุล:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={this.state.lastName}
                              onChange={e => this.setState({ lastName: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>สถานศึกษา:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={this.state.school}
                              onChange={e => this.setState({ school: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>จัดหวัด / เมืองที่อยู่:</label>
                            <input
                              type="text"
                              className="form-control"
                              value={this.state.city}
                              onChange={e => this.setState({ city: e.target.value })}
                            />
                          </div>
                          <div className="form-group">
                            <label>เกี่ยวกับฉัน:</label>
                            <textarea
                              type="text"
                              className="form-control"
                              value={this.state.bio}
                              onChange={e => this.setState({ bio: e.target.value })}
                            />
                          </div>
                          <button className="btn btn-luna btn-block">อัพเดทข้อมูล</button>
                        </form>
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
