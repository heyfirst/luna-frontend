import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import store from './store'

const Container = styled.div`
  background-color: #e8ebf3;
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
          <h6>รายละเอียดโจทย์:</h6>
          <p>{store.task.task_desc}</p>
          <hr />
        </div>
        <div>
          <h6>ข้อมูล Input:</h6>
          <p>{store.task.input_desc}</p>
          <hr />
        </div>
        <div>
          <h6>ข้อมูล Output:</h6>
          <p>{store.task.output_desc}</p>
          <hr />
        </div>
        <div>
          <h6>ข้อจำกัด:</h6>
          <p>{store.task.constrain_desc}</p>
        </div>
        <hr />
        <div>
          <h6>ตัวอย่าง:</h6>
          <p>{store.task.examples}</p>
        </div>
      </Container>
    )
  }
}

export default TaskDetail
