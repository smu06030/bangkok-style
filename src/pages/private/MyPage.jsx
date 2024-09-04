import styled from "styled-components";
import Avatar from "../../components/MyPage/Avatar";
import MyPosts from "../../components/MyPage/MyPosts";
import ChangePassword from "../../components/MyPage/ChangePassword";
import { Toaster } from "sonner";
import Nickname from "../../components/MyPage/Nickname";

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const MyPage = () => {
  return (
    <>
      <Toaster position="top-center" richColors />
      <InfoBox>
        <Avatar />
        <Nickname />
        <ChangePassword />
      </InfoBox>
      <MyPosts />
    </>
  );
};

export default MyPage;
