import React from 'react'
import requireAuth from '../utils/requireAuth'

@requireAuth()
class ProfilePage extends React.Component {
  render() {
    return <div>ProfilePage</div>
  }
}

export default ProfilePage
