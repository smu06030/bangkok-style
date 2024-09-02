import styled from 'styled-components'

const ButtonWrapper = styled.button`
  background-color: #1e293b;
  color: white;
  font-size: 0.875rem;
  padding: 0.5rem 1.5rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
  border: 0;
  transition: all 0.3s;
  cursor: pointer;

  &:hover{
    opacity: 0.8;
  }
`

const Button = ({children, onClick}) => {
  return (
    <ButtonWrapper onClick={onClick}>{children}</ButtonWrapper>
  )
}

export default Button