import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import Upload from "../../assets/images/Upload";
import MyUser from "../../assets/images/MyUser";
import { Like } from "../../assets/images/Likes";
import useSignInHandler from "../../hooks/useSignInHandler";
import { Toaster } from "sonner";
import URLS from "../../constant/urls";

const HeaderWrapper = styled.header`
  padding: 1.5rem;
  min-height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.013), 0px 4px 5px 0px rgba(0, 0, 0, 0.07),
    0px 1px 10px 0px rgba(0, 0, 0, 0);
  position: relative;
  z-index: 99;
`;

const HeaderIcons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  gap: 0.5rem;
  transition: all 0.3s;
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

const Logout = styled(Link)`
  ${linkStyles}
`;

const PrivateHeader = () => {
  const { onSignOutHandler } = useSignInHandler();
  return (
    <>
      <Toaster position="top-center" richColors />
      <HeaderWrapper>
        <Logo to={URLS.home}>방콕 스타일</Logo>
        <HeaderIcons>
          <Link to={URLS.upload}>
            <Upload width="24" height="24" />
          </Link>
          <Link to={URLS.like}>
            <Like width="24" height="24" />
          </Link>
          <Link to={URLS.myPage}>
            <MyUser width="24" height="24" />
          </Link>
          <Logout onClick={(e) => onSignOutHandler(e)}>로그아웃</Logout>
        </HeaderIcons>
      </HeaderWrapper>
    </>
  );
};

export default PrivateHeader;
