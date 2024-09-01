import { useContext, useEffect, useState } from "react";
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
  text-align: center;
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
  const PAGES = 10;

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate(URLS.signIn);
  };

  useEffect(() => {
    if (userInfo) {
      fetchLikedPosts();
    }
  }, [userInfo, PAGES]);

  //supabase에서 likes 테이블 데이터값 가져오기
  const fetchLikedPosts = async () => {
    try {
      const { data: likeData, error: likeError } = await supabase
        .from("likes")
        .select("post_id")
        .eq("user_id", userInfo.id)
        .limit(PAGES);

      const postIds = likeData.map((like) => like.post_id);

      if (postIds.length === 0) {
        setLikedPosts([]);
        return;
      }

      const { data: postData, error: postError } = await supabase.from("posts").select("*").in("id", postIds);

      //좋아요 상태 업데이트 로직
      const likedPostsWithStatus = postData.map((post) => ({
        ...post,
        isLiked: true
      }));

      setLikedPosts(likedPostsWithStatus);
    } catch (error) {
      console.error("좋아요 업데이트에 실패했습니다:", error);
    }
  };

  // 좋아요 해제 로직
  const handleUnlike = (post_id) => {
    setLikedPosts((p) => p.filter((post) => post.id !== post_id));
  };

  return (
    <>
      {!userInfo ? (
        <div>
          <TitleStyle>
            <h1>좋아요</h1>
          </TitleStyle>
          <p>로그인하고 관심있는 사진을 등록 해 보세요.</p>
          <button onClick={handleSignIn}>로그인하기</button>
        </div>
      ) : (
        <LikeContainer>
          <TitleStyle>좋아요</TitleStyle>
          <CardWrapper>
            {likedPosts.length > 0 ? (
              likedPosts.map((post) => (
                <PostCard key={post.id} post={post} userInfo={userInfo} onUnlike={handleUnlike} />
              ))
            ) : (
              <NoLikesMessage>좋아요 한 사진이 없습니다.</NoLikesMessage>
            )}
          </CardWrapper>
        </LikeContainer>
      )}
    </>
  );
};

export default Like;
