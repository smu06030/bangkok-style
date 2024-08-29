import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";

const HeaderWrapper = styled.header`
  padding: 1.5rem;
  min-height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.013), 0px 4px 5px 0px rgba(0, 0, 0, 0.07),
    0px 1px 10px 0px rgba(0, 0, 0, 0);
`;

const linkStyles = css`
  text-decoration: none;
  color: #000;
`;

const Logo = styled(Link)`
  ${linkStyles}
  font-size: 1.25rem;
  font-weight: 700;
`;

const Login = styled(Link)`
  ${linkStyles}
`;

const PublicHeader = () => {
  const location = useLocation();

  return (
    <HeaderWrapper>
      <Logo to="/">방콕 스타일</Logo>
      {location.pathname === "/" && <Login to="/sign-in">로그인</Login>}
    </HeaderWrapper>
  );
};

export default PublicHeader;
