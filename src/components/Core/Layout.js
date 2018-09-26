import React from 'react'
import LunaNavbar from './Navbar'

const Layout = ({ children }) => (
  <div>
    <LunaNavbar />
    {children}
  </div>
)

export default Layout
