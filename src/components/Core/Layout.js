import React from 'react'
import styled from 'styled-components'
import LunaNavbar from './Navbar'

const Container = styled.div`
  padding-bottom: 2rem;
`

const Layout = ({ children }) => (
  <Container>
    <LunaNavbar />
    {children}
  </Container>
)

export default Layout
