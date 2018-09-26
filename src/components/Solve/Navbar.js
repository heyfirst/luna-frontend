import React from 'react'
import styled from 'styled-components'
import { Icon } from 'antd'
import { Navbar } from 'reactstrap'

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
`

export default class SolveNavbar extends React.Component {
  render() {
    return (
      <SolveNavbarContainer color="dark" dark expand="md">
        <button className="back-btn btn btn-link">
          <Icon type="arrow-left" theme="outlined" />
          {` Back`}
        </button>
        <div className="navbar-brand task-name">Tasks #1</div>
      </SolveNavbarContainer>
    )
  }
}
