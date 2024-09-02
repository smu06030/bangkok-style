import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Like, LikeActive } from "../../assets/images/Likes";
import updateLikeStatus from "../../services/likeService";

const commonStyles = `
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: wrap;
  text-overflow: ellipsis;
`;

const Links = styled(Link)`
  color: #000;
  text-decoration: none;
`;

const PostWrapper = styled.div`
  /* width: 350px; */
  width: 100%;
  padding: 0 0 8px 0;
  text-align: left;

  &:hover {
    border-radius: 0.3rem;
    transition: all 0.3s;
    filter: brightness(110%);
    box-shadow: 0 2px 10px 5px rgba(196, 196, 196, 0.6);
    background-color: #e3e3e3;
  }
`;

const PostImageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const PostImage = styled.img`
  width: 100%;
  height: 200px;
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
  ${commonStyles}
`;

const LikeIcon = styled.span`
  width: 36px;
  height: 36px;
`;

const PostHashTag = styled.div`
  font-size: 0.875rem;
  padding: 0 6px 6px;
  margin-top: -4px;
  color: rgba(18, 93, 255, 0.9);
`;

const PostContent = styled.div`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  padding: 2px 6px 2px;
  ${commonStyles}
`;

const PostCard = ({ post, userInfo, onUnlike }) => {
  const { id: post_id, img_url, isLiked, title, hash_tag, content } = post;
  const [isLike, setIsLike] = useState(isLiked);
  const navigate = useNavigate();

  const toggleLike = async () => {
    if (!userInfo) {
      alert("로그인이 필요합니다.");
      return navigate("/sign-in");
    }

    setIsLike(!isLike);
    await updateLikeStatus(post_id, userInfo.id, isLike);

    // 좋아요 해제 시 onUnlike 콜백 호출
    if (isLike && onUnlike) {
      onUnlike(post_id);
    }
  };

  // 게시글 보여주기
  const postCard = (
    <Links>
      <PostWrapper>
        <PostImageWrapper>
          <PostImage src={img_url} />
        </PostImageWrapper>
        <PostTitle>
          <Title>{title}</Title>
          <LikeIcon onClick={toggleLike}>
            {!isLike ? <Like width="24" height="24" /> : <LikeActive width="24" height="24" />}
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
