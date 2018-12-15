import React from 'react'
import Layout from '../components/Core/Layout'
import AdminProblemsSidebar from '../components/AdminProblems/Sidebar'

class AdminProblems extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <div className="row">
            <div className="col-3">
              <AdminProblemsSidebar />
            </div>
            <div className="col-9">..</div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default AdminProblems
