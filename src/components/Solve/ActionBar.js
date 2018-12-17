import React from 'react'
import styled from 'styled-components'
import { Navbar } from 'reactstrap'
import { observer } from 'mobx-react'
import SolveStore from './store'
import { withRouter } from 'react-static'

const ActionContainer = styled(Navbar)`
  display: flex;
  justify-content: center;
  position: relative;
  height: 56px;
  padding-bottom: 0;
  padding-top: 0;
  background-color: white !important;
  color: #29406b;
  filter: drop-shadow(0rem 0.25rem 0.15rem rgba(0, 0, 0, 0.1));
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);

  .action-group {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .menus {
      .panel {
        font-weight: 300;
        color: #29406b;
        padding: 0 1.2rem;
        height: 100%;
        align-items: center;
        display: flex;
        transition: all 0.2s;
        cursor: pointer;

        &:hover {
          border-bottom: 4px solid #29406b;
        }

        &.active {
          border-bottom: 4px solid #29406b;
          font-weight: bold;
        }
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
      background: #7498e9;
      color: white;
    }

    &.btn-submit {
      background: #47c9d1;
      color: white;
    }
  }
`

@withRouter
@observer
export default class ActionBar extends React.Component {
  render() {
    const store = SolveStore

    return (
      <ActionContainer color="dark" dark expand="md">
        <div className="action-group">
          <div className="menus d-flex">
            <div
              className={`panel mr-2 ${store.leftPanel === 'TASK_DETAIL' && 'active'}`}
              onClick={() => store.setLeftPanel('TASK_DETAIL')}
            >
              รายละเอียด
            </div>
            <div
              className={`panel mr-2 ${store.leftPanel === 'SOLUTION' && 'active'}`}
              onClick={() => store.setLeftPanel('SOLUTION')}
            >
              คำตอบของเพื่อน
            </div>
          </div>
          <div className="action">
            <button
              className="btn btn-runtest mr-2"
              onClick={() => store.runTest(this.props.history)}
            >{`ทดสอบ`}</button>
            <button
              className="btn btn-submit"
              onClick={() => store.submit(this.props.history)}
            >{`ส่งคำตอบ`}</button>
          </div>
        </div>
      </ActionContainer>
    )
  }
}
