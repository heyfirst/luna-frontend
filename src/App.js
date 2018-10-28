import React from 'react'
import { injectGlobal } from 'styled-components'
import { Route as ReactRoute, Switch, withRouter, Redirect } from 'react-static'
import { hot } from 'react-hot-loader'
import * as R from 'ramda'
import { observer, inject } from 'mobx-react'

import './App.css'
import NotFound from './containers/404'
import TopicPage from './containers/TopicPage'
import Home from './containers/Home'
import TaskListPage from './containers/TaskListPage'
import SolvePage from './containers/SolvePage'
import ProfilePage from './containers/ProfilePage'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import Background from './static/images/bg.png'

injectGlobal`
  body {
    background: url(${Background});
    background-size: cover;
  }
`

class Route extends React.Component {
  componentWillMount() {
    nprogress.start()
  }

  componentDidMount() {
    nprogress.done()
  }

  render() {
    return <ReactRoute {...this.props} />
  }
}

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
      <React.Fragment>
        <Route
          path="/:url*"
          exact
          strict
          render={props => <Redirect to={`${props.location.pathname}/`} />}
        />
        <Switch>
          <Route key={2} exact path="/" component={Home} />
          <Route key={3} exact path="/topics" component={TopicPage} />
          <Route key={4} exact path="/topics/:topicID" component={TaskListPage} />
          <Route key={5} exact path="/tasks/:taskID" component={SolvePage} />
          <Route key={6} exact path="/profile" component={ProfilePage} />
          <Route component={NotFound} />
        </Switch>
      </React.Fragment>
    )
  }
}
export default R.compose(
  hot(module),
  withRouter
)(App)
