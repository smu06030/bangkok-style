import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  padding: 1.5rem;
  min-height: 4rem;
  width: 100%;
`
const Logo = styled.div`
  
`

const PublicHeader = () => {
  return (
    <HeaderWrapper>
      <Logo>로그인 안 한 사용자</Logo>
    </HeaderWrapper>
  )
}

export default PublicHeader