import React from "react";
import { useNavigate } from "react-router-dom";

const PublicHome = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/sign-in');
  }

  const handleSignUp = () => {
    navigate('/sign-up');
  }

  return (
    <>
      <div>Public Home</div>
      <button onClick={handleSignIn}>로그인</button>
      <button onClick={handleSignUp}>회원가입</button>
    </>
  );
};

export default PublicHome;
