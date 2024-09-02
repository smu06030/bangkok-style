import { useContext } from "react";
import PublicHeader from "./PublicHeader";
import { Outlet } from "react-router-dom";
import Container from "../UI/Container";
import styled from "styled-components";
import EntireContext from "../../Context/EntireContext";
import PrivateHeader from "./PrivateHeader";

const Main = styled.main`
  padding: 0 1.5rem;
`;

const Layout = () => {
  const { userInfo } = useContext(EntireContext);
  
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
