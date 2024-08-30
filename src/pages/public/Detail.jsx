import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import EntireContext from "../../store/Context/EntireContext";
import Like from "../../assets/images/Like";

const Detail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("id");
  console.log(postId);
  const { posts } = useContext(EntireContext);
  console.log("Posts:", posts);
  const post = posts.posts.find((post) => post.id === Number(postId));

  if (!post) return <div>해당 post를 찾을 수 없습니다.</div>;

  return (
    <OuterDiv>
      <PostDiv>
        <span>id: {post.id}</span>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5QPTO0dfQhrhSVMfjUTjj-7uh1zyqNnjYCg&s"
          alt=""
        />
        {/* <img src={post.img_url} alt="" /> */}
        <span>❤️</span>
        <span>+ 99</span>
        <span>{post.hash_tag}</span>
        <span>{post.content}</span>
      </PostDiv>
    </OuterDiv>
  );
};
export default Detail;

const OuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 30%;
  height: calc(100vh - 80px);
  margin: 0 auto;

  span {
    margin-bottom: 10px;
  }
`;

const PostDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;

  border: 1px solid lightgray;
  padding: 1em;
  width: 100%;
  border-radius: 1rem;
`;
