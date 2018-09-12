import React from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { NavLink as Link, withRouter } from 'react-static'
import { observer, inject } from 'mobx-react'

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
      <Navbar color="dark" dark expand="md">
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
                    Profile
                  </DropdownToggle>
                  <DropdownMenu right>
                    <Link to="/profile/">
                      <DropdownItem>Profile</DropdownItem>
                    </Link>
                  </DropdownMenu>
                  <DropdownMenu right>
                    <DropdownItem onClick={() => this.logout()}>Logout</DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    )
  }
}

export default LunaNavbar
