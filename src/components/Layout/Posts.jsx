import React from "react";
import useFetchPosts from "../../hooks/useFetchPosts";
import PostCard from "./PostCard";
import styled from "styled-components";
import Loading from "../../assets/images/Loading";

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

const Posts = () => {
  const { posts, loading } = useFetchPosts();

  const postCard = posts.posts.map((post) => <PostCard key={post.id} post={post} />);
  const showLoading = loading && <Loading />;
  const showPosts = posts.posts.length ? <Article>{postCard}</Article> : <h2>게시글이 없습니다.</h2>;
  
  return (
    <PostsWrapper>
      <ArticleHeader>방콕 스타일</ArticleHeader>
      {showLoading}
      {showPosts}
    </PostsWrapper>
  );
};

export default Posts;
