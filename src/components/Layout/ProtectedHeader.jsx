import React from 'react'
import styled from 'styled-components'

const HeaderWrapper = styled.header`
  padding: 1.5rem;
  min-height: 4rem;
  width: 100%;
`

const ProtectedHeader = () => {
  return (
    <HeaderWrapper>
      로그인 한 사용자
    </HeaderWrapper>
  )
}

export default ProtectedHeader