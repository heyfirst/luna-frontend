import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import store from './store'

const Container = styled.div`
  background-color: #efefef;
  height: 100%;
  padding: 1rem;
  white-space: pre-wrap;
  overflow: auto;
`

@observer
class TaskDetail extends React.Component {
  render() {
    return (
      <Container>
        <div>
          <h6>
            <u>Description:</u>
          </h6>
          <p>{store.task.task_desc}</p>
          <hr />
        </div>
        <div>
          <h6>
            <u>Input:</u>
          </h6>
          <p>{store.task.input_desc}</p>
          <hr />
        </div>
        <div>
          <h6>
            <u>Output:</u>
          </h6>
          <p>{store.task.output_desc}</p>
          <hr />
        </div>
        <div>
          <h6>
            <u>Constains:</u>
          </h6>
          <p>{store.task.constrain_desc}</p>
        </div>
        <hr />
        <div>
          <h6>
            <u>Example:</u>
          </h6>
          <p>{store.task.examples}</p>
        </div>
      </Container>
    )
  }
}

export default TaskDetail
