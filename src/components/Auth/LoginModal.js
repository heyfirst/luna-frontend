import React from 'react'
import { Button, Modal } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('user')
@observer
class LoginModal extends React.Component {
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
          await this.props.history.replace('/')
        }
      },
      { scope: 'email,public_profile', auth_type: 'rerequest' }
    )
  }

  render() {
    return (
      <Modal
        title={null}
        footer={null}
        visible={this.props.user.loginModalVisible}
        onOk={() => this.props.user.setLoginModal(false)}
        onCancel={() => this.props.user.setLoginModal(false)}
      >
        <Button type="primary" onClick={() => this.onLogin()}>
          Sign In with Facebook
        </Button>
      </Modal>
    )
  }
}

export default LoginModal
