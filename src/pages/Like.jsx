import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import URLS from "../constant/urls";
import PostCard from "../components/Layout/PostCard";
import { useCustomSelector } from "../hooks/useSelector";

const LikeContainer = styled.div`
  text-align: center;
`;

const TitleStyle = styled.div`
  margin: 2rem 0;
  font-size: 1.5rem;
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding: 0;
  gap: 1rem;
`;

const NoLikesMessage = styled.p`
  grid-column: 1 / -1; /* 메시지를 그리드 전체에 걸치게 설정 */
  justify-self: center;
`;

const Like = () => {
  const userInfo = useCustomSelector((state) => state.userInfo);
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();

  const PAGES = 10;

  const handleSignIn = () => navigate(URLS.signIn);

  // '좋아요'한 게시물을 가져오기
  const fetchLikedPosts = useCallback(async () => {
    if (!userInfo) return; // 비로그인으로 좋아요 시, 페이지 나가기

    try {
      // supabase likes 테이블에서 '좋아요'한 게시물의 ID 가져오기
      const { data: likeData } = await supabase.from("likes").select("post_id").eq("user_id", userInfo.id).limit(PAGES);

      const postIds = likeData.map((like) => like.post_id); // 가져온 ID 배열로 저장
      if (postIds.length === 0) {
        setLikedPosts([]); // '좋아요'한 게시물이 없으면 빈 배열 저장
        return;
      }

      // supabase posts 테이블에서 '좋아요'한 게시물의 상세 정보 가져오기
      const { data: postData } = await supabase.from("posts").select("*").in("id", postIds);

      // 메인 페이지에서 '좋아요' 한 데이터 가져올 때 '좋아요' true 표시
      const likedPostsWithStatus = postData.map((post) => ({
        ...post,
        isLiked: true
      }));

      setLikedPosts(likedPostsWithStatus);
    } catch (error) {
      console.error("좋아요 업데이트에 실패했습니다:", error);
    }
  }, [userInfo]); // 계정 인증 상태가 변경될 때 마다 새로운 데이터 가져오기

  // 페이지가 처음 열리거나, 계정 인증 상태가 변경될 때 '좋아요'한 게시물 가져오기
  useEffect(() => {
    fetchLikedPosts();
  }, [fetchLikedPosts]);

  // 좋아요 해제 로직
  const handleUnlike = (post_id) => {
    setLikedPosts((prevPosts) => prevPosts.filter((post) => post.id !== post_id));
  };

  //조건부 렌더링
  const renderContent = () => {
    if (!userInfo) {
      return (
        <LikeContainer>
          <TitleStyle />
          <p>로그인하고 관심있는 사진을 등록 해 보세요.</p>
          <button onClick={handleSignIn}>로그인하기</button>
        </LikeContainer>
      );
    }

    if (likedPosts.length > 0) {
      return (
        <CardWrapper>
          {likedPosts.map((post) => (
            <PostCard key={post.id} post={post} userInfo={userInfo} onUnlike={handleUnlike} />
          ))}
        </CardWrapper>
      );
    }

    return <NoLikesMessage>좋아요 한 사진이 없습니다.</NoLikesMessage>;
  };

  return (
    <>
      <LikeContainer>
        <TitleStyle>좋아요</TitleStyle>
        {renderContent()}
      </LikeContainer>
    </>
  );
};

export default Like;
