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
import Avatar from './Avatar'

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

  button {
    font-weight: 300;
  }

  .navbar-brand,
  .nav-link,
  button {
    cursor: pointer;
    color: #073466;
    transition: all 0.3s;
  }

  .nav-link.active {
    font-weight: 500;
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
    await window.location.replace('/')
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
                <Link className="nav-link" to="/practice/">
                  ฝึกฝน
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/challenge/">
                  รวมโจทย์
                </Link>
              </NavItem>
              {/* <NavItem>
                <Link className="nav-link disabled" to="/tournament/" disabled>
                  การแข่งขัน
                </Link>
              </NavItem> */}
              <NavItem>
                <Link className="nav-link" to="/ranking/">
                  จัดอันดับ
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
                  <DropdownToggle
                    nav
                    caret
                    className=" d-flex justify-content-center align-items-center"
                  >
                    <Avatar
                      src={this.props.user.user.avatar}
                      size={'38'}
                      className="d-inline-block mr-1"
                    />
                    {this.props.user.user.first_name} {this.props.user.user.last_name}
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem header>ส่วนผู้ดูแลระบบ</DropdownItem>
                    <Link to="/admin/problems">
                      <DropdownItem>จัดการโจทย์</DropdownItem>
                    </Link>
                    <Link to="/admin/users">
                      <DropdownItem>จัดการผู้ใช้</DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <Link to="/profile/">
                      <DropdownItem>โปรไฟล์ของตัวเอง</DropdownItem>
                    </Link>
                    <Link to="/howto-score/">
                      <DropdownItem>วิธีเก็บคะแนน</DropdownItem>
                    </Link>
                    <DropdownItem onClick={() => this.logout()}>ออกจากระบบ</DropdownItem>
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
