import React from "react";
import { useNavigate } from "react-router-dom";

const PublicHome = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const handleLike = () => {
    navigate("/Like");
  };

  return (
    <>
      <div>Public Home</div>
      <button onClick={handleSignIn}>로그인</button>
      <button onClick={handleSignUp}>회원가입</button>
      <button onClick={handleLike}>좋아요</button>
    </>
  );
};

export default PublicHome;
