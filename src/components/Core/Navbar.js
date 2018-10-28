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
import LoginModal from '../Auth/LoginModal'

const NewNavbar = styled(Navbar)`
  height: 56px;
  background-color: #fafafa;
  padding: 0;
  filter: drop-shadow(0rem 0.25rem 0.15rem rgba(0, 0, 0, 0.1));
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  z-index: 99;

  .navbar-brand {
    font-weight: 400;
  }

  .navbar-brand,
  .nav-link,
  button {
    cursor: pointer;
    color: #073466;
  }

  .nav-link.disabled {
    text-decoration: line-through;
  }
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
      <NewNavbar expand="md">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Luna
          </Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Link className="nav-link" to="/topics/">
                  ฝึกฝน
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link disabled" to="/challenge/" disabled>
                  รวมโจทย์
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link disabled" to="/tournament/" disabled>
                  การแข่งขัน
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link disabled" to="/ranking/" disabled>
                  อันดับ
                </Link>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
              {!this.props.user.authenticated ? (
                <NavItem>
                  <a className="nav-link" onClick={() => this.props.user.setLoginModal(true)}>
                    เข้าสู่ระบบ
                  </a>
                  <LoginModal />
                </NavItem>
              ) : (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <NewImg src="http://placehold.it/60x60" height="30" width="30" />{' '}
                    {this.props.user.user.first_name} {this.props.user.user.last_name}
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
