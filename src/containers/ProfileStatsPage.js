import React from 'react'
import requireAuth from '../utils/requireAuth'
import { inject, observer } from 'mobx-react'
import Layout from '../components/Core/Layout'
import LearningProgressCard from '../components/Profile/LearningProgressCard'
import ImprovementCard from '../components/Profile/ImprovementCard'
import CalendarHeatmapCard from '../components/Profile/CalendarHeatmapCard'
import ProfileSidebar from '../components/Profile/ProfileSidebar'

@requireAuth()
@inject('user')
@observer
class ProfileStatsPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <div className="row">
            <div className="col-3">
              <div className="row mb-3">
                <div className="col">
                  <ProfileSidebar active={'profile-stats'} />
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row mb-3">
                <div className="col">
                  <CalendarHeatmapCard />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <ImprovementCard />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <LearningProgressCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ProfileStatsPage
