import React from 'react'
import Card from '../Core/Card'
import { withRouter } from 'react-static'

@withRouter
class AdminSidebar extends React.Component {
  render() {
    const { active } = this.props

    return (
      <Card>
        <button
          className={`btn ${active === 'profile' && 'btn-luna'} btn-block`}
          onClick={() => this.props.history.push('/profile/')}
        >
          โจทย์ทั้งหมด
        </button>
        <button
          className={`btn ${active === 'profile-tournaments' && 'btn-luna'} btn-block`}
          onClick={() => this.props.history.push('/profile/')}
        >
          เพิ่มโจทย์
        </button>
      </Card>
    )
  }
}

export default AdminSidebar
