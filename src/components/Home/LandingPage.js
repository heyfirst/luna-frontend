import React from 'react'
import { inject, observer } from 'mobx-react'
import styled, { keyframes } from 'styled-components'
import Particles from 'react-particles-js'

import Layout from '../Core/Layout'
import Star1 from '../../static/images/p1.png'
import Star2 from '../../static/images/p2.png'
import Star3 from '../../static/images/p3.png'
import ParticleConfig from '../../static/particle.config.json'
import Moon from '../../static/images/moon.png'

const FloatAstro = keyframes`
  0% {
      transform: translateY(0)
  }

  50% {
      transform: translateY(1rem)
  }

  100% {
      transform: translateY(0)
  }
`

const FrontLayout = styled.div`
  height: 100%;

  .foreground {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-size: 400px;
    z-index: 0;
  }

  h1,
  h3 {
    color: white;
  }

  .container {
    z-index: 2;
    height: calc(100vh - 56px);
  }

  .headline {
    position: absolute;
    top: 25%;

    h1 {
      font-size: 7rem;
      margin: 0;
    }

    h3 {
      white-space: pre-line;
    }
  }

  .astronaut {
    position: absolute;
    height: 20rem;
    right: 0;
    bottom: 10%;
    animation: ${FloatAstro} 6s infinite normal;
  }

  .moon {
    position: absolute;
    height: 28rem;
    right: 12%;
    top: 8%;
    animation: ${FloatAstro} 10s infinite normal;
  }

  .particle {
    height: calc(100% - 56px);
    position: absolute;
    z-index: 1;
    width: 100%;
  }

  .star-1 {
    position: absolute;
    width: 75px;
    top: 14%;
    left: 17%;
    animation: ${FloatAstro} 12s infinite normal;
  }
  .star-2 {
    position: absolute;
    width: 185px;
    top: 70%;
    left: 25%;
    animation: ${FloatAstro} 20s infinite normal;
  }
  .star-3 {
    position: absolute;
    width: 160px;
    top: 80%;
    left: 75%;
    animation: ${FloatAstro} 7s infinite normal;
  }
`

@inject('user')
@observer
class LandingPage extends React.Component {
  render() {
    return (
      <FrontLayout>
        <Layout>
          <React.Fragment>
            <Particles className="particle" params={ParticleConfig} />
            <div className="foreground" />
            <img src={Star1} className="star-1" alt="" />
            <img src={Star2} className="star-2" alt="" />
            <img src={Star3} className="star-3" alt="" />
            <div className="container position-relative">
              <div className="headline">
                <h1>Luna</h1>
                <h3>{`เว็บแอปพลิเคชันสำหรับ\nพัฒนาทักษะด้านการเขียนโปรแกรม`}</h3>
                <button
                  className="btn btn-luna"
                  onClick={() => this.props.user.setLoginModal(true)}
                >
                  เริ่มต้นออกเดินทาง
                </button>
              </div>
              <img src={Moon} alt="Luna Moon" className="moon" />
            </div>
          </React.Fragment>
        </Layout>
      </FrontLayout>
    )
  }
}

export default LandingPage
