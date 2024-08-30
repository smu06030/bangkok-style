import React from "react";
import useFetchPosts from "../../hooks/useFetchPosts";
import PostCard from "./PostCard";
import styled from "styled-components";

const ArticleHeader = styled.h2`
  margin-top: 2rem;
  font-size: 1.5rem;
  text-align: center;
`;

const Article = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Posts = () => {
  const { posts } = useFetchPosts();

  const postCard = posts.posts.map((post) => <PostCard key={post.id} post={post} />);

  return (
    <>
      <ArticleHeader>방콕 스타일</ArticleHeader>
      <Article>{postCard}</Article>
    </>
  );
};

export default Posts;
