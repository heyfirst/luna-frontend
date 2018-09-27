import React from 'react'
import { Icon } from 'antd'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { Collapse } from 'reactstrap'

import TestcaseSuccess from '../../static/images/testcase-success.png'
import TestcaseFail from '../../static/images/testcase-fail.png'

const Container = styled.div`
  background: #152d46;
  flex-basis: ${props => 100 - props.size}%;
  padding-top: 2px;
  transition: all 0.15s;
  overflow: auto;
`

const TestList = styled.div`
  margin: 1rem;
`

const TastcaseContainer = styled.div`
  background: #0f1d33;
  color: white;
  padding: 1rem;
  margin: 0.4rem 0;
  cursor: pointer;

  display: flex;
  flex-direction: column;

  .title {
    display: flex;
    align-items: center;
    position: relative;
    font-weight: bold;

    .anticon-caret-down {
      display: flex;
      align-items: center;
      font-size: 12px;
      margin-right: 0.5rem;
      transform: rotate(-90deg);
      transition: transform 0.2s;
    }

    .status {
      height: 1.25rem;
      position: absolute;
      right: 0;
    }
  }

  .detail {
    padding: 0.5rem;

    &-list {
      display: flex;

      .label {
        width: 40%;
      }

      .value {
        width: 60%;

        &.success {
          color: #f2994a;
        }
        &.fail {
          color: #d80027;
        }
        &.expected {
          color: #47c9d1;
        }
      }
    }
  }

  &.active {
    .anticon-caret-down {
      transform: rotate(0deg);
    }
  }
`

class Testcase extends React.Component {
  state = { collapse: false }
  render() {
    const { pass, title, input, output, expectedOutput } = this.props
    return (
      <TastcaseContainer
        onClick={() => this.setState({ collapse: !this.state.collapse })}
        className={this.state.collapse && 'active'}
      >
        <div className="title">
          <Icon type="caret-down" />
          {` ${title}`}
          <img className="status" src={pass ? TestcaseSuccess : TestcaseFail} />
        </div>
        <Collapse isOpen={this.state.collapse} className="detail">
          <div className="detail-list">
            <div className="label">Input:</div>
            <div className="value">{input}</div>
          </div>
          <div className="detail-list">
            <div className="label">Output:</div>
            <div className={`value ${pass ? 'success' : 'fail'}`}>{output}</div>
          </div>
          <div className="detail-list">
            <div className="label">Expected Output:</div>
            <div className="value expected">{expectedOutput}</div>
          </div>
        </Collapse>
      </TastcaseContainer>
    )
  }
}

@observer
export default class ResultPanel extends React.Component {
  render() {
    return (
      <Container size={this.props.size}>
        <TestList>
          {[...Array(10)].map((e, index) => (
            <Testcase
              key={index}
              pass={index % 2 === 0}
              title={`Testcase #${index + 1}`}
              input={`1 2`}
              output={`3`}
              expectedOutput={index % 2 === 0 ? '3' : '2'}
            />
          ))}
        </TestList>
      </Container>
    )
  }
}
