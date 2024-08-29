import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Section = styled.section`

`

const PublicHome = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/sign-in');
  }

  const handleSignUp = () => {
    navigate('/sign-up');
  }

  return (
    <Section>
      <div>그냥 메인 화면</div>
      <button onClick={handleSignIn}>로그인</button>
      <button onClick={handleSignUp}>회원가입</button>
    </Section>
  );
};

export default PublicHome;
