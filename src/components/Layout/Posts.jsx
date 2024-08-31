import React from "react";
import useFetchPosts from "../../hooks/useFetchPosts";
import PostCard from "./PostCard";
import styled from "styled-components";
import Loading from "../../assets/images/Loading";
import Button from "../UI/Button";
import { filteredDisplayedPostsData } from "../../utils/filteredDisplayedPostsData";
import { LIMIT_NUMBER } from "../../constant/constants";

const PostsWrapper = styled.div`
  text-align: center;
`;

const ArticleHeader = styled.h2`
  margin: 2rem 0;
  font-size: 1.5rem;
  text-align: center;
`;

const Article = styled.article`
  /* position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center; */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 0;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  width: auto;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const Posts = () => {
  const { allPosts, displayedPosts, setDisplayedPosts, loading } = useFetchPosts();

  const postCard = displayedPosts.map((post) => <PostCard key={post.id} post={post} />);
  const showPosts = displayedPosts.length ? (
    <>
      <Article>{postCard}</Article>
      <Button onClick={() => setDisplayedPosts(filteredDisplayedPostsData(LIMIT_NUMBER, allPosts, displayedPosts))}>
        더보기
      </Button>
    </>
  ) : (
    <h3>게시글이 없습니다.</h3>
  );

  if (loading) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }

  return (
    <PostsWrapper>
      <ArticleHeader>방콕 스타일</ArticleHeader>
      {showPosts}
    </PostsWrapper>
  );
};

export default Posts;
