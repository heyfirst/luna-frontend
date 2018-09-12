import React from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-static'
import { hot } from 'react-hot-loader'
import * as R from 'ramda'
import { observer, inject } from 'mobx-react'

import Layout from './components/Core/Layout'
import LunaNavbar from './components/Core/Navbar'

import './App.css'
import NotFound from './containers/404'
import Login from './containers/Login'
import TopicPage from './containers/TopicPage'
import Home from './containers/Home'
import TaskListPage from './containers/TaskListPage'
import TaskPage from './containers/TaskPage'

@inject('user')
@observer
class App extends React.Component {
  state = {
    loading: true
  }

  componentWillMount() {
    this.props.user.setLoginIn(true)
    this.props.user
      .getProfile()
      .then(async () => {
        if (!this.props.user.authenticated) {
          await this.props.history.replace('/login')
          await this.props.user.setLoginIn(false)
        } else {
          await this.props.user.setLoginIn(false)
        }
      })
      .catch(() => {
        console.log('you are not logging in')
      })
  }

  render() {
    if (this.props.user.logingIn) {
      return <div />
    }

    return (
      <Layout>
        <LunaNavbar />
        <Route
          path="/:url*"
          exact
          strict
          render={props => <Redirect to={`${props.location.pathname}/`} />}
        />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/topics" component={TopicPage} />
          <Route exact path="/topics/:topicID" component={TaskListPage} />
          <Route exact path="/tasks/:taskID" component={TaskPage} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    )
  }
}
export default R.compose(
  hot(module),
  withRouter
)(App)
