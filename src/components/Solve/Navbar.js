import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'
import { observer } from 'mobx-react'
import { Navbar } from 'reactstrap'

import store from './store'
import { withRouter } from 'react-static'

const SolveNavbarContainer = styled(Navbar)`
  background-color: #29406b !important;
  display: flex;
  justify-content: center;
  position: relative;
  height: 56px;

  .back-btn {
    position: absolute;
    left: 0;
    color: white;

    &:hover {
      text-decoration: none;
    }
  }

  .task-name {
  }

  .duration {
  }
`

@withRouter
@observer
export default class SolveNavbar extends React.Component {
  render() {
    return (
      <SolveNavbarContainer color="dark" dark expand="md">
        <button
          className="back-btn btn btn-link"
          onClick={() => this.props.history.push(`/practice/${store.task.main_topic.id}`)}
        >
          <Icon type="arrow-left" theme="outlined" />
          {` Back`}
        </button>
        <div className="navbar-brand task-name">
          {!store.loading && (
            <React.Fragment>
              {store.task.task_name}{' '}
              <div className="text-muted d-inline small duration">({store.durationInTime})</div>
            </React.Fragment>
          )}
        </div>
      </SolveNavbarContainer>
    )
  }
}
