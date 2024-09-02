import styled from "styled-components";
import Avatar from "../../components/MyPage/Avatar";
import MyPosts from "../../components/MyPage/MyPosts";
import Nickname from "../../components/MyPage/NickName";
import ChangePassword from "../../components/MyPage/ChangePassword";

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const MyPage = () => {
  return (
    <>
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
