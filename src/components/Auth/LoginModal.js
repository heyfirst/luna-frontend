import React from 'react'
import styled from 'styled-components'
import { Button, Modal, Icon } from 'antd'
import { inject, observer } from 'mobx-react'
import LoginShip from '../../static/images/login-ship.png'

const ShipImage = styled.img`
  transform: rotate(17.5deg);
`

const LoginButton = styled(Button)`
  font-size: 1rem;
`

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
        <div className="d-flex flex-column">
          <div className="text-center mb-2">
            <ShipImage src={LoginShip} alt="luna-login-ship" className="img-fluid w-50 p-1" />
          </div>
          <h4 className="text-center">เข้าสู่ระบบก่อนออกเดินทาง</h4>
          <LoginButton type="primary" onClick={() => this.onLogin()}>
            <Icon type="facebook" theme="filled" /> เข้าสู่ระบบด้วย Facebook
          </LoginButton>
        </div>
      </Modal>
    )
  }
}

export default LoginModal
