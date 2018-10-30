import React from 'react'
import requireAuth from '../utils/requireAuth'
import { inject, observer } from 'mobx-react'
import Layout from '../components/Core/Layout'
import ProfileSidebar from '../components/Profile/ProfileSidebar'

@requireAuth()
@inject('user')
@observer
class ProfileSubmissionPage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <div className="row">
            <div className="col-3">
              <div className="row mb-3">
                <div className="col">
                  <ProfileSidebar active={'profile-submission'} />
                </div>
              </div>
            </div>
            <div className="col-9">
              <div className="row mb-3">
                <div className="col">Hi : 3</div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ProfileSubmissionPage
