import UserStore from './UserStore'

class RootStore {
  constructor() {
    this.user = new UserStore(this)
  }
}

export default new RootStore()
