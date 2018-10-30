import React from 'react'
import { inject, observer } from 'mobx-react'
import styled, { keyframes } from 'styled-components'
import Particles from 'react-particles-js'

import Layout from '../Core/Layout'
import ParticleConfig from '../../static/particle.config.json'
import Card from '../Core/Card'
import TaskItem from '../Task/TaskItem'
import { Link } from 'react-static'

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
                    <h3 className="mb-0">ทำโจทย์ข้อนี้ต่อไหม ?</h3>
                    <p className="px-4">
                      โจทย์ข้อนี้ยังทำไม่เสร็จเลย มาแก้โจทย์ปัญหานี้กันต่อดีกว่า
                    </p>
                    <TaskItem name="Lorem..." difficult={`Beginner`} topic={`String`} />
                  </div>
                </Card>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <Card>
                  <div className="text-center px-4">
                    <h3>ลองทำโจทย์ข้อนี้ดูสิ</h3>
                    <TaskItem name="Lorem..." difficult={`Intermediate`} topic={`String`} />
                    <TaskItem name="Lorem..." difficult={`Beginner`} topic={`String`} />
                    <TaskItem name="Lorem..." difficult={`Advance`} topic={`String`} />
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
                      <Link to="/challange">ดูโจทย์ทั้งหมด</Link>
                    </p>
                    <TaskItem
                      name="Lorem..."
                      difficult={`Beginner`}
                      topic={`String`}
                      passCount={12192}
                    />
                    <TaskItem name="Lorem..." difficult={`Intermediate`} topic={`String`} />
                    <TaskItem name="Lorem..." difficult={`Intermediate`} topic={`String`} />
                    <TaskItem name="Lorem..." difficult={`Beginner`} topic={`String`} />
                    <TaskItem name="Lorem..." difficult={`Intermediate`} topic={`String`} />
                    <TaskItem name="Lorem..." difficult={`Beginner`} topic={`String`} />
                    <TaskItem name="Lorem..." difficult={`Intermediate`} topic={`String`} />
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
