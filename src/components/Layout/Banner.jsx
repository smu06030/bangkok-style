import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import banner from "../../assets/images/banner.png";
import Search from "./../../assets/images/Search";
import useDebounce from "../../hooks/useDebounce";
import EntireContext from "../../Context/EntireContext";
import { filteredDisplayedPostsData, filteredSearchTermData } from "../../utils/filteredPostsData";
import { LIMIT_NUMBER } from "../../constant/constants";

const BannerImage = styled.img`
  width: calc(100% + 48px);
  height: 300px;
  margin: 0 -24px;
  filter: brightness(70%);
`;

const BannerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const BannerTitle = styled.h2`
  position: absolute;
  display: flex;
  color: #fff;
  font-size: 3rem;
  font-weight: 500;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BannerSearchForm = styled.form`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 55%;

  & button {
    position: absolute;
    width: 36px;
    height: 36px;
    padding: 0;
    left: 0;
    border: 0;
    margin-left: 8px;
    background-color: transparent;
  }
`;

const BannerSearchInput = styled.input`
  font-family: "Pretendard";
  font-size: 1rem;
  width: 360px;
  outline: none;
  border: 0;
  border-radius: 2rem;
  padding: 1rem 3rem;
`;

const Banner = () => {
  const { allPosts, filteredPosts, setDisplayedPosts, setFilteredPosts, setDebounceValue } = useContext(EntireContext);
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearchTerm = useDebounce(searchTerm.trim());

  useEffect(() => {
    const filterPost = allPosts.filter(
      (post) => post.title.includes(debounceSearchTerm) || post.content.includes(debounceSearchTerm)
    );

    setDebounceValue(debounceSearchTerm);
    setFilteredPosts(filterPost);
  }, [debounceSearchTerm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (debounceSearchTerm === "") {
      setDisplayedPosts(filteredDisplayedPostsData(LIMIT_NUMBER, allPosts));
    } else {
      setDisplayedPosts(filteredSearchTermData(LIMIT_NUMBER, filteredPosts));
    }
  };

  return (
    <BannerWrapper>
      <BannerImage src={banner} alt="배너" />
      <BannerTitle>OOTD</BannerTitle>
      <BannerSearchForm onSubmit={handleSubmit}>
        <button>
          <Search width="24" height="24" />
        </button>
        <BannerSearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="스타일을 검색해보세요."
        />
      </BannerSearchForm>
    </BannerWrapper>
  );
};

export default Banner;
