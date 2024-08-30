import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import dummy from "../../assets/images/dummy.jpg";
import styled from "styled-components";
import Like from "../../assets/images/Like";
import LikeActive from "../../assets/images/LikeActive";
import EntireContext from "../../store/Context/EntireContext";

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

const Title = styled.span`
  font-size: 1.125rem;
`;

const LikeIcon = styled.span`
  width: 36px;
  height: 36px;
`;

const PostHashTag = styled.div`
  font-size: 0.875rem;
  padding: 0 6px 6px;
  margin-top: -6px;
  color: rgba(0, 0, 0, 0.5);
`;

const PostContent = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  padding: 2px 6px 2px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PostCard = ({ post }) => {
  const [isLikeActive, setIsLikeActive] = useState(false);
  const { userInfo } = useContext(EntireContext);
  const navigate = useNavigate();

  const { img_url, title, hash_tag, content } = post;

  const toggleLike = () => {
    if (!userInfo) {
      alert("로그인이 필요합니다.");
      navigate("/sign-in");
      return;
    }
    setIsLikeActive(!isLikeActive);
  };

  // 게시글 보여주기
  const postCard = (
    <Links>
      <PostWrapper>
        <PostImageWrapper>
          <PostImage src={dummy} />
        </PostImageWrapper>
        <PostTitle>
          <Title>{title}</Title>
          <LikeIcon onClick={toggleLike}>
            {!isLikeActive ? <Like width="24" height="24" /> : <LikeActive width="24" height="24" />}
          </LikeIcon>
        </PostTitle>
        <PostHashTag>{hash_tag}</PostHashTag>
        <PostContent>{content}</PostContent>
      </PostWrapper>
    </Links>
  );

  return <>{postCard}</>;
};

export default PostCard;
