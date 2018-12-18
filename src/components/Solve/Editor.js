import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import SolveStore from './store'
import * as R from 'ramda'

const Container = styled.div`
  flex-basis: ${props => props.size}%;
  padding-bottom: 2px;
  transition: all 0.15s;

  #ace {
    width: 100% !important;
    height: 100% !important;
  }
`

const CodeEditor = props => {
  if (typeof window !== 'undefined') {
    const Ace = require('react-ace').default
    require('brace/mode/java')
    require('brace/theme/solarized_dark')
    require('../../static/coding-theme.css')

    return <Ace {...props} />
  }

  return null
}

@observer
export default class Editor extends React.Component {
  state = { mounted: false }

  componentDidMount() {
    this.setState({ mounted: true })
  }

  render() {
    const store = SolveStore

    return (
      <Container size={this.props.size}>
        {this.state.mounted && (
          <React.Fragment>
            {store.leftPanel === 'TASK_DETAIL' ? (
              <CodeEditor
                mode="java"
                theme="solarized_dark"
                name="ace"
                onChange={store.changeCode}
                fontSize={12}
                showPrintMargin
                showGutter
                highlightActiveLine
                value={store.code}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: false,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2
                }}
              />
            ) : (
              <CodeEditor
                mode="java"
                theme="solarized_dark"
                name="ace"
                fontSize={12}
                readOnly
                showPrintMargin
                showGutter
                highlightActiveLine
                value={R.path(
                  ['source_code'],
                  store.solutions.find(s => s.id === store.solution_select)
                )}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: false,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2
                }}
              />
            )}
          </React.Fragment>
        )}
      </Container>
    )
  }
}
