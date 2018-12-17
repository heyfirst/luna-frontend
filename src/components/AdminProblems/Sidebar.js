import React from 'react'
import Card from '../Core/Card'
import { withRouter } from 'react-static'
import store from './store'
import { observer } from 'mobx-react'

@withRouter
@observer
class AdminSidebar extends React.Component {
  render() {
    return (
      <Card>
        <button
          className={`btn ${store.page === 'TASK_LIST' && 'btn-luna'} btn-block`}
          onClick={() => store.setPage('TASK_LIST')}
        >
          โจทย์ทั้งหมด
        </button>
        <button
          className={`btn ${store.page === 'TASK_ADD' && 'btn-luna'} btn-block`}
          onClick={() => store.setPage('TASK_ADD')}
        >
          เพิ่มโจทย์
        </button>
      </Card>
    )
  }
}

export default AdminSidebar
