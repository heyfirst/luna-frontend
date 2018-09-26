import React from 'react'
import styled from 'styled-components'
import Editor from './Editor'
import Testcases from './Testcases'

const SplitPanelLine = styled.div`
  position: absolute;
  z-index: 1;
  top: ${props => props.size}%;
  background: #ccc;
  width: auto;
  height: 4px;
  left: 0;
  right: 0;
  margin-top: -2px;
  cursor: ns-resize;
  transition: all 0.15s;
`

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`

let timeout = false

export default class SolvePanel extends React.Component {
  state = {
    size: 50
  }

  componentDidMount() {
    this.dragImg = new Image(0, 0)
    this.dragImg.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }

  handleOnDragStart = e => {
    e.dataTransfer.setDragImage(this.dragImg, 0, 0)
  }

  onDragSplitPanel = e => {
    let height =
      window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    console.log(e.screenY, height)
    if (e.screenY !== 0 && !timeout) {
      timeout = true
      this.setState({
        size: (e.screenY / (height + 112)) * 100
      })
      setTimeout(() => {
        timeout = false
      }, 100)
    }
  }

  render() {
    return (
      <Container className="h-100">
        <Editor size={this.state.size} />
        <SplitPanelLine
          draggable
          onDragStart={e => this.handleOnDragStart(e)}
          onDrag={e => this.onDragSplitPanel(e)}
          size={this.state.size}
        />
        <Testcases size={this.state.size} />
      </Container>
    )
  }
}
