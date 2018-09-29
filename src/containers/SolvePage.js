import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import SolveStore from '../components/Solve/store'

import requireAuth from '../utils/requireAuth'
import SolveNavbar from '../components/Solve/Navbar'
import ActionBar from '../components/Solve/ActionBar'
import TaskDetail from '../components/Solve/TaskDetail'
import SolvePanel from '../components/Solve/SolvePanel'
import { withRouter } from 'react-static'

const Container = styled.div`
  display: flex;
  height: calc(100vh - 112px);
  position: relative;
`

const Panel = styled.div`
  display: flex;
  width: 100%;
`

const LeftContainer = styled.div`
  flex-basis: ${props => props.size}%;
  padding-right: 2px;
  padding-bottom: 0;
  transition: all 0.15s;
`
const RightContainer = styled.div`
  flex-basis: ${props => 100 - props.size}%;
  padding-top: 0;
  padding-left: 2px;
  transition: all 0.15s;
`

const SplitPanel = styled.div`
  position: absolute;
  z-index: 1;
  width: 4px;
  top: 0;
  bottom: 0;
  left: ${props => props.size}%;
  margin-left: -2px;
  cursor: ew-resize;
  background: #ccc;
  transition: all 0.15s;

  & .content {
    display: none;
  }
  & .preview {
    display: block;
  }
`

let timeout = false

@withRouter
@requireAuth()
@observer
class SolvePage extends React.Component {
  state = {
    size: 50
  }

  async componentWillMount() {
    await SolveStore.fetchTask(this.props.match.params.taskID, this.props.history)
  }

  componentDidMount() {
    SolveStore.startDuration()
    this.dragImg = new Image(0, 0)
    this.dragImg.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
  }

  handleOnDragStart = e => {
    e.dataTransfer.setDragImage(this.dragImg, 0, 0)
  }

  onDragSplitPanel = e => {
    if (typeof window !== 'undefined') {
      let width =
        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
      if (e.screenX !== 0 && !timeout) {
        timeout = true
        this.setState({
          size: (e.screenX / width) * 100
        })
        setTimeout(() => {
          timeout = false
        }, 100)
      }
    }
  }

  render() {
    return (
      <div>
        <SolveNavbar />
        <Container>
          {!SolveStore.loading && (
            <React.Fragment>
              <SplitPanel
                draggable
                onDragStart={e => this.handleOnDragStart(e)}
                onDrag={e => this.onDragSplitPanel(e)}
                size={this.state.size}
              />
              <Panel>
                <LeftContainer size={this.state.size}>
                  <TaskDetail />
                </LeftContainer>
                <RightContainer size={this.state.size}>
                  <SolvePanel />
                </RightContainer>
              </Panel>
            </React.Fragment>
          )}
        </Container>
        <ActionBar />
      </div>
    )
  }
}

export default withRouter(SolvePage)
