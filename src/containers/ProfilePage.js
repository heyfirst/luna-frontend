import React from 'react'
import requireAuth from '../utils/requireAuth'
import { inject, observer } from 'mobx-react'
import Layout from '../components/Core/Layout'
import ProfileCard from '../components/Profile/ProfileCard'
import LearningProgressCard from '../components/Profile/LearningProgressCard'
import ImprovementCard from '../components/Profile/ImprovementCard'
import CalendarHeatmapCard from '../components/Profile/CalendarHeatmapCard'

@requireAuth()
@inject('user')
@observer
class ProfilePage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <div className="row mb-3">
            <div className="col">
              <ProfileCard user={this.props.user.user} />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-5">
              <LearningProgressCard />
            </div>
            <div className="col-7">
              <CalendarHeatmapCard />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <ImprovementCard />
            </div>
          </div>
          <div className="row mb-3" />
        </div>
      </Layout>
    )
  }
}

export default ProfilePage
