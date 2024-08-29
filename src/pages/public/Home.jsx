import React from "react";
import styled from "styled-components";
import supabase from "../../supabaseClient";
import Banner from "../../components/Layout/Banner";
import { useNavigate } from "react-router-dom";
import Posts from "../../components/Layout/Posts";

const Section = styled.section`
  
`;

const PublicHome = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const onSignOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("로그아웃에 실패했습니다.");
      return;
    }
    window.localStorage.removeItem("signIn");
    alert("로그아웃 하였습니다.");
    window.location.reload();
  };

  return (
    <Section>
      <div>그냥 메인 화면</div>
      <button onClick={handleSignIn}>로그인</button>
      <button type="submit" onClick={onSignOutHandler}>
        로그아웃
      </button>
      <button onClick={handleSignUp}>회원가입</button>
      <Banner />
      <Posts />
    </Section>
  );
};

export default PublicHome;
