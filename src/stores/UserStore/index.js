import { observable, action } from 'mobx'
import store from '../../utils/store'

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
  login = async data => {
    // try {
    //   const result = await UserService.login(data).then(async resp => {
    //     await store.setAccessToken(resp.data.token)
    //     await this.getProfile()
    //     message.success('เข้าสู่ระบบสำเร็จ กรุณารอซักครู่')
    //     return true
    //   })
    //   return result
    // } catch (error) {
    //   console.log(error)
    //   message.error('ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบยูสเซอร์หรือรหัสผ่าน')
    //   return false
    // }
  }

  @action
  getProfile = async () => {
    // try {
    //   await UserService.profile().then(resp => {
    //     this.setUser(resp.data)
    //     this.setLoggedIn()
    //   })
    // } catch (error) {
    //   console.log(error)
    // }
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
