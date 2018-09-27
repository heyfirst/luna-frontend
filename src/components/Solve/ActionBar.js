import React from 'react'
import styled from 'styled-components'
import { Navbar } from 'reactstrap'
import { observer } from 'mobx-react'
import SolveStore from './store'

const ActionContainer = styled(Navbar)`
  background-color: #29406b !important;
  display: flex;
  justify-content: center;
  position: relative;
  height: 56px;
  padding-bottom: 0;
  padding-top: 0;

  .action-group {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .menus {
      .panel {
        font-weight: bold;
        color: #00c0cc;
        padding: 0 1.2rem;
        height: 100%;
        align-items: center;
        display: flex;
        border-bottom: 4px solid #00c0cc;
      }
    }

    .action {
      padding: 0.5rem;
      display: flex;
    }
  }

  .btn {
    border-radius: 0.2rem;
    font-size: 14px;

    &.btn-runtest {
      background: #f2994a;
    }

    &.btn-submit {
      background: #47c9d1;
    }
  }
`

@observer
export default class ActionBar extends React.Component {
  render() {
    const store = SolveStore

    return (
      <ActionContainer color="dark" dark expand="md">
        <div className="action-group">
          <div className="menus">
            <div className="panel">Task Detail</div>
          </div>
          <div className="action">
            <button
              className="btn btn-runtest mr-2"
              onClick={() => store.runTest()}
            >{`Run Test`}</button>
            <button
              className="btn btn-submit"
              onClick={() => store.submit()}
            >{`Submit Answer`}</button>
          </div>
        </div>
      </ActionContainer>
    )
  }
}
