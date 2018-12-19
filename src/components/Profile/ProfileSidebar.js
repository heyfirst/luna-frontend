import React from 'react'
import Card from '../Core/Card'
import { Divider } from 'antd'
import { withRouter } from 'react-static'
import store from './store'
import { inject } from 'mobx-react'

@inject('user')
@withRouter
class ProfileSidebar extends React.Component {
  render() {
    const { active } = this.props

    return (
      <Card>
        <button
          className={`btn ${active === 'profile' && 'btn-luna'} btn-block`}
          onClick={() => this.props.history.push(`/profile/${store.user.username}/`)}
        >
          ข้อมูลส่วนตัว
        </button>
        {store.user.username === this.props.user.user.username && (
          <button
            className={`btn ${active === 'profile-edit' && 'btn-luna'} btn-block`}
            onClick={() => this.props.history.push(`/profile/${store.user.username}/edit`)}
          >
            แก้ไขข้อมูลส่วนตัว
          </button>
        )}
        <Divider />
        <button
          className={`btn ${active === 'profile-stats' && 'btn-luna'} btn-block`}
          onClick={() => this.props.history.push(`/profile/${store.user.username}/stats`)}
        >
          ข้อมูลสถิติ
        </button>
        <button
          className={`btn ${active === 'profile-submission' && 'btn-luna'} btn-block`}
          onClick={() => this.props.history.push(`/profile/${store.user.username}/submissions`)}
        >
          โจทย์ที่เคยทำ
        </button>
      </Card>
    )
  }
}

export default ProfileSidebar
