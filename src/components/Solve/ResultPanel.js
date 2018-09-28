import React from 'react'
import { Icon } from 'antd'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { Collapse } from 'reactstrap'

import SolveStore from './store'

import TestcaseSuccess from '../../static/images/testcase-success.png'
import TestcaseFail from '../../static/images/testcase-fail.png'

const Container = styled.div`
  background: #152d46;
  flex-basis: ${props => 100 - props.size}%;
  padding-top: 2px;
  transition: all 0.15s;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`

const TestList = styled.div`
  margin: 0 1rem;
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

const Menu = styled.div`
  display: flex;
  padding: 0.5rem 1rem;

  > div {
    cursor: pointer;
    position: relative;
    font-weight: bold;
    color: white;
    padding: 0.4rem 1rem;
    height: 100%;
    align-items: center;
    display: flex;
    margin-right: 1rem;
    transition: all 0.3s;
    height: 2.5rem;

    &.active {
      color: #00c0cc;

      &:before {
        border-bottom: 4px solid #00c0cc;
        content: '';
        position: absolute;
        height: 4px;
        width: 100%;
        left: 0;
        bottom: 0;
      }
    }
  }
`

const Console = styled.div`
  background: #0f1d33;
  color: white;
  padding: 1rem;
  margin: 0.4rem 1rem;
  white-space: pre-wrap;
`

class Testcase extends React.Component {
  state = { collapse: false }
  render() {
    const { pass, title, test, output, expectedOutput } = this.props
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
            <div className="label">Test:</div>
            <div className="value">{test}</div>
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
    const store = SolveStore
    return (
      <Container size={this.props.size}>
        <Menu>
          <div
            onClick={() => store.setResultPanelState('TESTCASE')}
            className={`${store.resultPanelState === 'TESTCASE' && 'active'}`}
          >
            Testcase
          </div>
          <div
            onClick={() => store.setResultPanelState('CONSOLE')}
            className={`${store.resultPanelState === 'CONSOLE' && 'active'}`}
          >
            Console
          </div>
        </Menu>
        {store.resultPanelState === 'TESTCASE' && (
          <TestList>
            {store.testcases.map((testcase, index) => (
              <Testcase
                key={testcase.id}
                pass={index % 2 === 0}
                title={`Testcase #${index + 1}`}
                test={`${testcase.test}`}
                output={`3`}
                expectedOutput={`${testcase.expected_output}`}
              />
            ))}
          </TestList>
        )}
        {store.resultPanelState === 'CONSOLE' && (
          <Console>{store.error.stderr || 'Nothing in Console.'}</Console>
        )}
      </Container>
    )
  }
}
