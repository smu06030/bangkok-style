import React, { useContext } from 'react'
import ProtectedHeader from './ProtectedHeader'
import PublicHeader from './PublicHeader'
import { Outlet } from 'react-router-dom'
import Container from '../UI/Container'
import styled from 'styled-components'
import EntireContext from '../../store/Context/EntireContext'

const Main = styled.main`
  padding: 0 1.5rem;
`

const Layout = () => {
  const { isSignIn } = useContext(EntireContext);

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