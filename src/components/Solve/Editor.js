import React from 'react'
import styled from 'styled-components'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/java'
import 'brace/theme/solarized_dark'

const Container = styled.div`
  flex-basis: ${props => props.size}%;
  padding-bottom: 2px;
  transition: all 0.15s;

  #ace {
    width: 100% !important;
    height: 100% !important;
  }
`

export default class Editor extends React.Component {
  render() {
    return (
      <Container size={this.props.size}>
        <AceEditor
          mode="java"
          theme="solarized_dark"
          name="ace"
          onLoad={this.onLoad}
          onChange={this.onChange}
          fontSize={14}
          showPrintMargin
          showGutter
          highlightActiveLine
          value={`class Student {
      public String getStudent() {
        return "123456";
      }
    }`}
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
