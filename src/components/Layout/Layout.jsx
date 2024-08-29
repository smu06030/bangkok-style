import React from 'react'
import ProtectedHeader from './ProtectedHeader'
import PublicHeader from './PublicHeader'
import { Outlet } from 'react-router-dom'
import Container from '../UI/Container'
import styled from 'styled-components'

const Main = styled.main`
  padding: 0 1.5rem;
`

const Layout = ({isSignIn}) => {
  return (
    <Container>
      {isSignIn ? <ProtectedHeader /> : <PublicHeader />}
      <Main>
        <Outlet />
      </Main>
    </Container>
  )
}

export default Layout