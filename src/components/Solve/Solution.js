import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import store from './store'
import { Table } from 'reactstrap'

const Container = styled.div`
  background-color: #e8ebf3;
  height: 100%;
  padding: 1rem;
  white-space: pre-wrap;
  overflow: auto;
`

const SolutionItem = styled.tr`
  cursor: pointer;

  &.active {
    font-weight: bold;
    color: white;
    background-color: #29406b !important;

    &:hover {
      font-weight: bold;
      color: white;
      background-color: #29406b !important;
    }
  }
`

@observer
class Solution extends React.Component {
  async componentWillMount() {
    await store.fetchAnswers()
  }
  render() {
    return (
      <Container>
        <div className="text-center mt-2">
          <Table striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>ชื่อผู้ใช้</th>
              </tr>
            </thead>
            <tbody>
              {store.solutions.map((solution, index) => (
                <SolutionItem
                  key={solution.id}
                  className={solution.id === store.solution_select && 'active'}
                  onClick={() => store.setSolutionSelect(solution.id)}
                >
                  <th scope="row">{index + 1}</th>
                  <td>{`${solution.owned_by.first_name} ${solution.owned_by.last_name}`}</td>
                </SolutionItem>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    )
  }
}

export default Solution
