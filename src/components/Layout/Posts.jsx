import React from "react";
import useFetchPosts from "../../hooks/useFetchPosts";
import PostCard from "./PostCard";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const Links = styled(Link)`
  color: #000;
  text-decoration: none;
`;

const PostWrapper = styled.div``;

const PostImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const PostImage = styled.img`
  width: 250px;
  height: auto;
  object-fit: cover;
  border-radius: 0.3rem;
`;

const PostTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0px 2px 6px;
  font-weight: 700;
`;

const Title = styled.span``;

const LikeIcon = styled.span`
  width: 36px;
  height: 36px;
`;

const PostHashTag = styled.div`
  font-size: 0.825rem;
  padding: 0 6px 6px;
  margin-top: -6px;
  color: rgba(0, 0, 0, 0.5);
`;

const PostContent = styled.div`
  margin-top: 0.5rem;
  padding: 2px 6px 2px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
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
