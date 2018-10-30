import React from 'react'
import Card from '../Core/Card'
import { Divider } from 'antd'
import { withRouter } from 'react-static'

@withRouter
class ProfileSidebar extends React.Component {
  render() {
    const { active } = this.props

    return (
      <Card>
        <button
          className={`btn ${active === 'profile' && 'btn-luna'} btn-block`}
          onClick={() => this.props.history.push('/profile/')}
        >
          ข้อมูลส่วนตัว
        </button>
        <button
          className={`btn ${active === 'profile-edit' && 'btn-luna'} btn-block`}
          onClick={() => this.props.history.push('/profile/edit')}
        >
          แก้ไขข้อมูลส่วนตัว
        </button>
        <Divider />
        <button
          className={`btn ${active === 'profile-stats' && 'btn-luna'} btn-block`}
          onClick={() => this.props.history.push('/profile/stats')}
        >
          ข้อมูลสถิติ
        </button>
        <button
          className={`btn ${active === 'profile-submission' && 'btn-luna'} btn-block`}
          onClick={() => this.props.history.push('/profile/submissions')}
        >
          โจทย์ที่เคยทำ
        </button>
        <button
          className={`btn ${active === 'profile-tournaments' && 'btn-luna'} btn-block`}
          disabled
        >
          การแข่งขันที่เข้าร่วม
        </button>
      </Card>
    )
  }
}

export default ProfileSidebar
