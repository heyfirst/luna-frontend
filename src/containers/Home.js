import React from 'react'
import { inject, observer } from 'mobx-react'

import LandingPage from '../components/Home/LandingPage'
import PortalPage from '../components/Home/PortalPage'

@inject('user')
@observer
class Home extends React.Component {
  render() {
    const { user } = this.props
    if (user.authenticated) {
      return <PortalPage />
    }
    return <LandingPage />
  }
}

export default Home
