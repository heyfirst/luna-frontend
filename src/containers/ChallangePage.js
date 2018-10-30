import React from 'react'
import requireAuth from '../utils/requireAuth'
import Layout from '../components/Core/Layout'
import Card from '../components/Core/Card'
import TaskItem from '../components/Task/TaskItem'

@requireAuth()
class ChallengePage extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <div className="row">
            <div className="col-3">
              <Card>Filter List</Card>
            </div>
            <div className="col-9">
              <Card>
                <p className="text-right">มีโจทย์ทั้งหมด 9 ข้อ</p>
                {[...Array(10)].map(_ => (
                  <TaskItem name="Lorem..." difficult={`Beginner`} topic={`String`} />
                ))}
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default ChallengePage
