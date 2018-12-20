import React from 'react'
import Layout from '../components/Core/Layout'
import AdminProblemsSidebar from '../components/AdminProblems/Sidebar'
import ProblemList from '../components/AdminProblems/ProblemList'
import ProblemAdd from '../components/AdminProblems/ProblemAdd'
import store from '../components/AdminProblems/store'
import { observer } from 'mobx-react'
import ProblemEdit from '../components/AdminProblems/ProblemEdit'
import TopicList from '../components/AdminProblems/TopicList'

@observer
class AdminProblems extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <div className="row">
            <div className="col-3">
              <AdminProblemsSidebar />
            </div>
            <div className="col-9">
              {store.page === 'TASK_LIST' && <ProblemList />}
              {store.page === 'TASK_ADD' && <ProblemAdd />}
              {store.page === 'TASK_EDIT' && <ProblemEdit />}
              {store.page === 'TOPIC_LIST' && <TopicList />}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default AdminProblems
