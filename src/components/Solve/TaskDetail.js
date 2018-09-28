import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import store from './store'

const Container = styled.div`
  padding: 1rem;
  white-space: pre-wrap;
`

@observer
class TaskDetail extends React.Component {
  render() {
    return <Container>{store.task.description}</Container>
  }
}

export default TaskDetail
