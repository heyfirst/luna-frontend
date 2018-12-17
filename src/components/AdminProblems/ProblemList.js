import React from 'react'
import Card from '../Core/Card'
import store from './store'
import { observer } from 'mobx-react'

@observer
class ProblemList extends React.Component {
  async componentWillMount() {
    await store.fetchAllTasks()
  }

  render() {
    return (
      <Card>
        <h1>โจทย์ทั้งหมดในระบบ</h1>
      </Card>
    )
  }
}

export default ProblemList
