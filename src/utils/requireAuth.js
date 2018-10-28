import React from 'react'
import { inject, observer } from 'mobx-react'

const requireAuth = () => Component => {
  @inject('user')
  @observer
  class RequireAuth extends React.Component {
    componentWillMount() {
      if (!this.props.user.authenticated) {
        this.props.history.replace('/')
        this.props.user.setLoginModal(true)
      }
    }

    render() {
      return <Component {...this.props} />
    }
  }

  return RequireAuth
}

export default requireAuth
