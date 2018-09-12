import React from 'react'
import requireAuth from '../utils/requireAuth'
import { inject, observer } from 'mobx-react'

@requireAuth()
@inject('user')
@observer
class ProfilePage extends React.Component {
  render() {
    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h1>
              Hi, {this.props.user.user.first_name} {this.props.user.user.last_name} 🌙
            </h1>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilePage
