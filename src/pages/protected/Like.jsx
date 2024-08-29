import React from "react";
import { useNavigate } from "react-router-dom";

const Like = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <div>
      <h1>좋아요 한 사진이 없습니다.</h1>
      <p>로그인하고 관심 사진을 등록 해 보세요.</p>
      <button onClick={handleSignIn}>로그인하기</button>
    </div>
  );
};

export default Like;
