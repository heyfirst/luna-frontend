import React from 'react'
import styled from 'styled-components'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/java'
import 'brace/theme/solarized_dark'
import '../../static/coding-theme.css'

import { observer } from 'mobx-react'
import SolveStore from './store'

const Container = styled.div`
  flex-basis: ${props => props.size}%;
  padding-bottom: 2px;
  transition: all 0.15s;

  #ace {
    width: 100% !important;
    height: 100% !important;
  }
`

@observer
export default class Editor extends React.Component {
  render() {
    const store = SolveStore

    return (
      <Container size={this.props.size}>
        <AceEditor
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
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2
          }}
        />
      </Container>
    )
  }
}
