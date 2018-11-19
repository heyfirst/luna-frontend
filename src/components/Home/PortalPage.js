import React from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components'
import Particles from 'react-particles-js'

import Layout from '../Core/Layout'
import ParticleConfig from '../../static/particle.config.json'
import Card from '../Core/Card'
import TaskItem from '../Task/TaskItem'
import { Link } from 'react-static'
import ChallengeService from '../../services/ChallengeService'
import UserService from '../../services/UserService'

const FrontLayout = styled.div`
  height: 100%;

  .particle {
    height: calc(100% - 56px);
    position: fixed;
    z-index: 1;
    width: 100%;
  }

  .container {
    z-index: 2;
  }
`

@inject('user')
@observer
class ProtalPage extends React.Component {
  state = {
    taskLoading: true,
    tasks: [],
    suggestLoading: true,
    suggests: [],
    randomPosition: 0
  }

  async componentDidMount() {
    await ChallengeService.getAllTask('All', 'All', 'All').then(resp => {
      let tasks = resp.data
      tasks = [...tasks].slice(0, 10)
      this.setState({ tasks: tasks, taskLoading: false })
    })

    await UserService.getSuggestionTasks().then(resp => {
      let suggests = resp.data
      this.setState({ suggests, suggestLoading: false })
    })
  }

  render() {
    return (
      <FrontLayout>
        <Layout>
          <Particles className="particle" params={ParticleConfig} />
          <div className="foreground" />
          <div className="container position-relative pt-4">
            <div className="row mb-3">
              <div className="col">
                <Card>
                  <div className="text-center px-4">
                    <h3>ลองทำโจทย์ข้อนี้ดูสิ</h3>
                    {!this.state.suggestLoading &&
                      this.state.suggests
                        .filter(t => !t.answered)
                        .slice(this.state.randomPosition, this.state.randomPosition + 2)
                        .map((task, index) => (
                          <TaskItem
                            key={index}
                            taskID={task.id}
                            name={task.task_name}
                            difficult={task.main_topic.level.level_name}
                            topic={task.main_topic.topic.topic_name}
                            solved={task.answered}
                          />
                        ))}
                  </div>
                </Card>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <Card>
                  <div className="text-center px-4">
                    <h3>โจทย์มาใหม่ 🎉</h3>
                    <p>
                      <Link to="/challenge">ดูโจทย์ทั้งหมด</Link>
                    </p>
                    {!this.state.taskLoading &&
                      this.state.tasks.map((task, index) => (
                        <TaskItem
                          key={index}
                          taskID={task.id}
                          name={task.task_name}
                          difficult={task.main_topic.level.level_name}
                          topic={task.main_topic.topic.topic_name}
                          solved={task.answered}
                        />
                      ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Layout>
      </FrontLayout>
    )
  }
}

export default ProtalPage
