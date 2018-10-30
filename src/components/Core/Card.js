import React from 'react'
import styled from 'styled-components'

const CardLayout = styled.div`
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

const Card = ({ children }) => (
  <CardLayout className={`card`}>
    <div className="card-body">{children}</div>
  </CardLayout>
)

export default Card
