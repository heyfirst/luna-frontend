import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { NavLink as Link, withRouter } from 'react-static'
import { observer, inject } from 'mobx-react'
import styled from 'styled-components'

const NewNavbar = styled(Navbar)`
  background-color : #29406B;
  padding: 0;
`

const NewImg = styled.img`
  border-radius: 50%;
  margin-right: 0.3rem;
`

@withRouter
@inject('user')
@observer
class LunaNavbar extends React.Component {
  state = {
    isOpen: false
  }

  logout = async () => {
    await this.props.user.logout()
    await window.location.replace('/login')
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <NewNavbar dark expand="md">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Luna
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/topics/">
                  Problems
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/challenge/">
                  Challenge
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/Ranking/">
                  Ranking
                </Link>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              {!this.props.user.authenticated ? (
                <NavItem>
                  <Link className="nav-link" to="/login/">
                    Login
                  </Link>
                </NavItem>
              ) : (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <NewImg src="http://placehold.it/60x60" height="30" width="30"/> {this.props.user.user.first_name} {this.props.user.user.last_name}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <Link to="/profile/">
                      <DropdownItem>My Profile</DropdownItem>
                    </Link>
                    <DropdownItem onClick={() => this.logout()}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
          </Collapse>
        </div>
      </NewNavbar>
    )
  }
}

export default LunaNavbar
