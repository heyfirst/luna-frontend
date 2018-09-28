import { observable, action } from 'mobx'
import { message } from 'antd'
import store from '../../utils/store'
import UserService from '../../services/UserService'

export default class UserStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable
  user = {}

  // for checking when you are loging in.
  @observable
  logingIn = false

  // for checking when you have logged in.
  @observable
  authenticated = false

  @action
  login = async accessToken => {
    this.setLoginIn(true)
    await store.removeAccessToken()
    message.loading('กำลังเข้าสู่ระบบ')
    try {
      const result = await UserService.facebookLogin(accessToken)
        .then(async resp => {
          this.setLoginIn(false)
          await store.setAccessToken(resp.data.accessToken)
          await this.getProfile()
          message.success('เข้าสู่ระบบสำเร็จ กรุณารอซักครู่')
          return true
        })
        .catch(err => {
          console.log(err)
          message.error('เข้าสู่ระบบไม่สำเร็จ กรุณาติดต่อผู้ดูแลระบบ')
        })
      return result
    } catch (error) {
      this.setLoginIn(false)
      message.error('เข้าสู่ระบบไม่สำเร็จ กรุณาติดต่อผู้ดูแลระบบ')
      console.log(error)
      return false
    }
  }

  @action
  getProfile = async () => {
    try {
      await UserService.getProfile().then(resp => {
        this.setUser(resp.data)
        this.setLoggedIn()
      })
    } catch (error) {
      console.log(error)
    }
  }

  @action
  logout = async () => {
    this.authenticated = false
    await store.removeAccessToken()
  }

  @action
  setUser = data => {
    this.user = data || null
  }

  @action
  setLoginIn = bool => {
    this.logingIn = bool
  }

  @action
  setLoggedIn = () => {
    this.authenticated = true
  }

  @action
  getUserName = () => `${this.user.first_name} ${this.user.last_name} (${this.user.role})`
}
