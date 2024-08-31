import styled from "styled-components";

export const SignFrom = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export const SignBtn = styled.button`
  width: ${({ $signUp }) => ($signUp ? "450px" : "220px")};
  font-size: 18px;
  height: 50px;
  cursor: pointer;
  color: white;
  background-color: black;
  border-radius: 5px;
  border: none;

  &:hover {
    background-color: #2d3436;
  }

  &:active {
    opacity: 60%;
  }
`;

export const SignNav = styled.nav`
  cursor: pointer;

  &:hover {
    color: #636e72;
  }

  &:active {
    opacity: 60%;
  }
`;

export const NavGuide = styled.nav`
  display: flex;
  flex-direction: row;
  font-size: 18px;
  gap: 80px;
  margin-top: 26px;
`;
