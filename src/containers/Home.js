import React from 'react'
import Layout from '../components/Core/Layout'

class Home extends React.Component {
  render() {
    return (
      <Layout>
        <div className="container mt-4">
          <div className="row">
            <div className="col">
              <h1>Welcome to Luna 🌙</h1>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Home
