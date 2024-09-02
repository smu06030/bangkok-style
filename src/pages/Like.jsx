import { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import EntireContext from "../Context/EntireContext";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import URLS from "../constant/urls";
import PostCard from "../components/Layout/PostCard";

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
  const { userInfo } = useContext(EntireContext);
  const [likedPosts, setLikedPosts] = useState([]);
  const navigate = useNavigate();
  const PAGES = 10;

  const handleSignIn = () => navigate(URLS.signIn);

  //supabase에서 likes 테이블 데이터값 가져오기
  const fetchLikedPosts = useCallback(async () => {
    if (!userInfo) return; // 유저가 없으면 함수 종료

    try {
      const { data: likeData } = await supabase.from("likes").select("post_id").eq("user_id", userInfo.id).limit(PAGES);

      const postIds = likeData.map((like) => like.post_id);
      if (postIds.length === 0) {
        setLikedPosts([]);
        return;
      }

      const { data: postData } = await supabase.from("posts").select("*").in("id", postIds);

      const likedPostsWithStatus = postData.map((post) => ({
        ...post,
        isLiked: true
      }));

      setLikedPosts(likedPostsWithStatus);
    } catch (error) {
      console.error("좋아요 업데이트에 실패했습니다:", error);
    }
  }, [userInfo]); // userInfo가 변경될 때만 fetchLikedPosts가 변경됨

  useEffect(() => {
    fetchLikedPosts();
  }, [fetchLikedPosts]);

  const handleUnlike = (post_id) => {
    setLikedPosts((prevPosts) => prevPosts.filter((post) => post.id !== post_id));
  };

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
