import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'
import { observer } from 'mobx-react'
import { Navbar } from 'reactstrap'

import store from './store'
import { withRouter } from 'react-static'

const SolveNavbarContainer = styled(Navbar)`
  background-color: white !important;
  color: #29406b;
  display: flex;
  justify-content: center;
  position: relative;
  height: 56px;
  filter: drop-shadow(0rem 0.25rem 0.15rem rgba(0, 0, 0, 0.1));
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  z-index: 999;

  .back-btn {
    position: absolute;
    left: 0;
    color: #29406b;

    &:hover {
      text-decoration: none;
    }
  }

  .task-name {
    color: #29406b;
    font-weight: bold;

    &:hover {
      color: #29406b;
    }
  }

  .duration {
    color: #29406b;
  }
`

@withRouter
@observer
export default class SolveNavbar extends React.Component {
  render() {
    return (
      <SolveNavbarContainer color="dark" dark expand="md">
        <button className="back-btn btn btn-link" onClick={() => this.props.history.goBack()}>
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
