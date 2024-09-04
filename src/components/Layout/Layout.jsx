import PublicHeader from "./PublicHeader";
import { Outlet } from "react-router-dom";
import Container from "../UI/Container";
import styled from "styled-components";
import PrivateHeader from "./PrivateHeader";
import { useCustomSelector } from "../../hooks/useSelector";

const Main = styled.main`
  padding: 0 1.5rem;
`;

const Layout = () => {
  const userInfo = useCustomSelector((state) => state.userInfo);
  
  return (
    <Container>
      {userInfo ? <PrivateHeader /> : <PublicHeader />}
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

export default Layout;
