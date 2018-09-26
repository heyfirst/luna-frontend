import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  flex-basis: ${props => 100 - props.size}%;
  padding-top: 2px;
  transition: all 0.15s;
`

export default class Testcases extends React.Component {
  render() {
    return (
      <Container size={this.props.size}>
        <h3>Testcase</h3>
      </Container>
    )
  }
}
