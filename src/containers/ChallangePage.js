import React from 'react'
import requireAuth from '../utils/requireAuth'
import Layout from '../components/Core/Layout'
import Card from '../components/Core/Card'

@requireAuth()
class ChallengePage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <div className="row">
            <div className="col-3">
              <Card>Menu</Card>
            </div>
            <div className="col-9">
              <Card>Task</Card>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ChallengePage
