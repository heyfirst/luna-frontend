import React from 'react'
import { Button } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('user')
@observer
class Login extends React.Component {
  componentWillMount() {
    if (this.props.user.authenticated) {
      this.props.history.replace('/')
    }
  }

  onLogin = () => {
    /* global FB */
    FB.login(
      async fbResponse => {
        if (fbResponse) {
          const { accessToken } = fbResponse.authResponse
          console.log(accessToken)
          await this.props.user.login(accessToken)
        }
      },
      { scope: 'email,public_profile', auth_type: 'rerequest' }
    )
  }
  render() {
    return (
      <div className="container pt-4">
        <div className="row">
          <div className="col-12 text-center">
            <h2>Sign In</h2>
            <Button type="primary" onClick={() => this.onLogin()}>
              Sign In with Facebook
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
