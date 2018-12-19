import { observable, action } from 'mobx'
import { message } from 'antd'
import UserService from '../../services/UserService'

class ProfileStore {
  @observable
  loading = false

  @observable
  user = {}

  @action
  fetchUser = async id => {
    this.loading = true
    let user = await UserService.getAccount(id)
      .then(resp => resp.data)
      .catch(_ => {
        window.location.href = '/'
      })
    this.user = user
    this.loading = false
  }
}

export default new ProfileStore()
