import React from 'react'
import styled from 'styled-components'
import LunaNavbar from './Navbar'
import Background from '../../static/images/bg-luna-front.png'

const Container = styled.div`
  padding-bottom: 2rem;
  min-height: 100%;
  background-image: url(${Background});
  background-repeat: repeat;
`

const Layout = ({ children }) => (
  <Container>
    <LunaNavbar />
    {children}
  </Container>
)

export default Layout
