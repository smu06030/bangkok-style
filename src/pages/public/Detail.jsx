import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchPosts from "../../hooks/useFetchPosts";
import { useEffect, useState } from "react";
import updateLikeStatus from "../../services/likeService";
import { Like, LikeActive } from "../../assets/images/Likes";
import CommentSection from "../../services/CommentSection";

const Detail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const post_id = queryParams.get("id");
  const { allPosts, isLiked, userInfo } = useFetchPosts();
  const [post, setPost] = useState(null);
  const [isLike, setIsLike] = useState(isLiked);

  // postId가 바뀔 때 post정보 가져오기
  useEffect(() => {
    const selectedPost = allPosts.find((post) => post.id === Number(post_id));
    if (selectedPost) {
      setPost(selectedPost);
      setIsLike(selectedPost.isLiked || false);
    }
  }, [post_id, allPosts]);

  // 좋아요 상태
  const toggleLike = async () => {
    if (!userInfo) {
      alert("로그인이 필요합니다.");
      navigate("/sign-in");
      return;
    }
    const newLikeStatus = !isLike;
    setIsLike(newLikeStatus);
    // await new Promise((resolve) => setTimeout(resolve, 0));
    await updateLikeStatus(post.id, userInfo.id, !newLikeStatus);
  };

  if (!post) {
    return <div>Loading...</div>; // 데이터가 없을 때 로딩 화면
  }

  const handleClick = (id) => {
    navigate(`/upload?id=${id}`);
  };

  return (
    <>
      <span>id: {post.id}</span>
      <OuterDiv>
        <PostDiv>
          <button onClick={() => handleClick(post.id)}>수정</button>
          <span>user_id: {post.user_id}</span>
          <PostImg src={post.img_url} alt={post.id} />
          <span style={{ marginTop: "5px" }}>
            <span onClick={toggleLike}>
              {!isLike ? <Like width="24" height="24" /> : <LikeActive width="24" height="24" />}
            </span>
          </span>
          <span>{post.hash_tag}</span>
          <PostTitle>{post.title}</PostTitle>
          <span>{post.content}</span>
          <CommentSection
            post_id={post_id}
            setComments={(comments) => setPost((prevPost) => ({ ...prevPost, comments }))}
          />
        </PostDiv>
      </OuterDiv>
    </>
  );
};

export default Detail;

const OuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 30%;
  margin: 1em auto;
  span {
    margin-bottom: 10px;
  }
`;

const PostDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  height: 80vh; /* Adjusted height to fit within viewport */
  max-width: 100%; /* Ensures width does not exceed viewport */
  border: 1px solid lightgray;
  padding: 1em;
  border-radius: 1rem;
  overflow: hidden; /* Hides overflowing content */
`;

const PostTitle = styled.h3`
  font-weight: 700;
  margin-bottom: 10px;
`;

const PostImg = styled.img`
  width: 100%; /* Ensures the image does not exceed the container width */
  height: auto; /* Maintains aspect ratio */
  margin: auto;
`;
