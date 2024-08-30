import React from "react";
import styled from "styled-components";
import Banner from "../../components/Layout/Banner";
import Posts from "../../components/Layout/Posts";

const Section = styled.section`
  
`;

const PublicHome = () => {
  return (
    <Section>
      <Banner />
      <Posts />
    </Section>
  );
};

export default PublicHome;
