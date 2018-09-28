import React from 'react'
import styled, { keyframes } from 'styled-components'

import Particles from 'react-particles-js'
import ParticleConfig from '../static/particle.config.json'

import Layout from '../components/Core/Layout'
import Foreground from '../static/images/foreground.png'
import Astronaut from '../static/images/astronaut.png'
import Moon from '../static/images/moon.png'

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
  background-color: #334a75;
  height: 100%;

  .foreground {
    background-image: url('${Foreground}');
    position: absolute;
    top:0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-size: 400px;
    z-index: 0;
  }

  h1, h3, button {
    color: white;
  }

  .container {
    z-index: 2;
    height: calc(100% - 56px);
  }

  .headline {
    position: absolute;
    top: 20%;

    h1 {
      font-size: 7rem;
      margin: 0;
    }

    h3{
      white-space: pre-line
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
    height: 14rem;
    right: 15%;
    top: 10%;
  }

  .particle {
    height: calc(100% - 56px);
    position: absolute;
    z-index: 1;
    width: 100%;
  }

`

class Home extends React.Component {
  render() {
    return (
      <FrontLayout>
        <Layout>
          <Particles className="particle" params={ParticleConfig} />
          <div className="foreground" />
          <div className="container position-relative">
            <div className="headline">
              <h1>Luna</h1>
              <h3>{`Web Applicaition for\n Improving Programming Skills`}</h3>
            </div>
            <img src={Astronaut} alt="Luna Astronaut" className="astronaut" />
            <img src={Moon} alt="Luna Moon" className="moon" />
          </div>
        </Layout>
      </FrontLayout>
    )
  }
}

export default Home
