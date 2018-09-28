import React from 'react'
import LunaNavbar from './Navbar'

const Layout = ({ children }) => (
  <React.Fragment>
    <LunaNavbar />
    {children}
  </React.Fragment>
)

export default Layout
