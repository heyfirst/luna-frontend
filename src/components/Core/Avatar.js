import styled from 'styled-components'

const Avatar = styled.div`
  height: ${props => props.size || '128'}px;
  width: ${props => props.size || '128'}px;
  border-radius: 50%;
  background-color: #00c0cc;
  border: 2px solid #00c0cc;
  background: url(${props => props.src});
  background-size: cover;
  margin: 0 auto;
`

export default Avatar
