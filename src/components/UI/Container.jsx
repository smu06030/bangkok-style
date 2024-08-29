import React from 'react'
import styled from 'styled-components'

const ContainerWrapper = styled.div`
  margin: 0 auto;
  padding : 0;
`

const Container = ({children}) => {
  return (
    <ContainerWrapper>{children}</ContainerWrapper>
  )
}

export default Container