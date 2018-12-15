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

import ProfileEditPage from './containers/ProfileEditPage'
import ProfileStatsPage from './containers/ProfileStatsPage'
import ProfileSubmissionPage from './containers/ProfileSubmissionPage'
import ChallengePage from './containers/ChallengePage'
import PrivacyPolicy from './containers/PrivacyPolicy'
import Ranking from './containers/Ranking'
import HowtoScore from './containers/HowtoScore'
import AdminProblems from './containers/AdminProblems'
import AdminUsers from './containers/AdminUsers'

injectGlobal`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background: linear-gradient(to bottom left, #13BCCA 0%,#2C4B6B 50%, #1B2E52 100%);
    background-attachment: fixed;
    font-family: 'Lato', 'Kanit', Helvetica, Arial, 'Lucida Grande', sans-serif !important;
    font-size: 14px;
    margin: 0;
    padding: 0;
    height: 100%;
    font-weight: 300;
  }

  .ant-table,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  button {
    font-family: 'Lato', 'Kanit', Helvetica, Arial, 'Lucida Grande', sans-serif !important;
  }

  #root {
    height: 100%;
  }

  .btn-luna {
    background-color: #47c9d1;
    border-color: #47c9d1;
    color: white;
  }

  .btn {
    border-radius: 10px;
  }

  .ant-input {
    height: 36px;
  }

  .ant-form-explain {
    margin-top: 2px;
  }

  /* Fix label overflow in mobile  */
  @media screen and (max-width: 768px) {
    .ant-form-item-label {
      white-space: normal;
    }
  }

  ::-moz-selection {
    /* Code for Firefox */
    color: white;
    background: #00c0cc;
  }

  ::selection {
    color: white;
    background: #00c0cc;
  }

  a:hover {
    text-decoration: none !important;
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
          <Route key={`chellange`} exact path="/challenge" component={ChallengePage} />
          <Route key={`ranking`} exact path="/ranking" component={Ranking} />
          <Route key={`/howto-score`} exact path="/howto-score" component={HowtoScore} />
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
          <Route key={`privacy-policy`} exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route key={`admin-problems`} exact path="/admin/problems" component={AdminProblems} />
          <Route key={`admin-users`} exact path="/admin/users" component={AdminUsers} />
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
