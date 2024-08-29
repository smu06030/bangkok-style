import React, { useEffect } from "react";
import styled from "styled-components";
import supabase from "../../supabaseClient";
import Banner from "../../components/Layout/Banner";

const Section = styled.section`
  
`;

const PublicHome = () => {
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    const { data } = await supabase.from("posts").select();

    console.log(data);
  };

  return (
    <Section>
      <Banner />
      
    </Section>
  );
};

export default PublicHome;
