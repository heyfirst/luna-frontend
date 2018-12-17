import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

const Container = styled.div`
  background-color: #e8ebf3;
  height: 100%;
  padding: 1rem;
  white-space: pre-wrap;
  overflow: auto;
`

@observer
class Solution extends React.Component {
  render() {
    return (
      <Container>
        <div>
          <h4>Soution:</h4>
        </div>
      </Container>
    )
  }
}

export default Solution
