import React from 'react'
import { injectGlobal } from 'styled-components'
import { Route as ReactRoute, Switch, withRouter, Redirect } from 'react-static'
import { hot } from 'react-hot-loader'
import * as R from 'ramda'
import { observer, inject } from 'mobx-react'

import './App.css'
import NotFound from './containers/404'
import PracticePage from './containers/PracticePage'
import Home from './containers/Home'
import PracticeTaskListPage from './containers/PracticeTaskListPage'
import SolvePage from './containers/SolvePage'
import ProfilePage from './containers/ProfilePage'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import Background from './static/images/bg.png'
import ProfileEditPage from './containers/ProfileEditPage'
import ProfileStatsPage from './containers/ProfileStatsPage'
import ProfileSubmissionPage from './containers/ProfileSubmissionPage'
import ChallengePage from './containers/ChallangePage'

injectGlobal`
  body {
    background: url(${Background});
    background-size: cover;
    background-attachment: fixed;
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
          <Route key={`home`} exact path="/" component={Home} />
          <Route key={`practice`} exact path="/practice" component={PracticePage} />
          <Route
            key={`practice-topic`}
            exact
            path="/practice/:topicID"
            component={PracticeTaskListPage}
          />
          <Route key={`challange`} exact path="/challenge" component={ChallengePage} />
          <Route key={`task`} exact path="/tasks/:taskID" component={SolvePage} />
          <Route key={`profile-edit`} exact path="/profile/edit" component={ProfileEditPage} />
          <Route key={`profile-stats`} exact path="/profile/stats" component={ProfileStatsPage} />
          <Route
            key={`profile-submission`}
            exact
            path="/profile/submissions"
            component={ProfileSubmissionPage}
          />
          <Route key={`profile`} exact path="/profile" component={ProfilePage} />
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
