import React from 'react'
import Card from '../Core/Card'

export default class ProfileCard extends React.Component {
  render() {
    const { user } = this.props

    return (
      <Card>
        <p>Welcome to Luna Codes</p>
        <h2 className="mb-0">
          Hi, {user.first_name} {user.last_name} 🌙
        </h2>
      </Card>
    )
  }
}
