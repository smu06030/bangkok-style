import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import EntireContext from "../store/Context/EntireContext";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

const LikeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const TitleStyle = styled.div`
  font-size: 30px;
  margin-bottom: 50px;
`;

const CardStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0;
  justify-content: center;
`;

const ImageStyle = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  object-fit: cover;
`;

const Like = () => {
  const { userInfo, updateLikeStatus } = useContext(EntireContext);
  const [likedPosts, setLikedPosts] = useState([]);
  const PAGES = 10;

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  useEffect(() => {
    if (userInfo) {
      fetchLikedPosts();
    }
  }, [userInfo, PAGES]);

  const fetchLikedPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select()
        .eq("like", true)
        .eq("user_id", userInfo.id)
        .limit(PAGES);

      if (error) {
        console.error("좋아요 업데이트에 실패했습니다:", error);
        return;
      }

      setLikedPosts(data);
      console.log("좋아요 상태가 업데이트되었습니다:", data);
    } catch (error) {
      console.error("좋아요 업데이트에 실패했습니다:", error);
    }
  };

  const handleUnlike = async (post_id) => {
    try {
      await updateLikeStatus(post_id, userInfo.id, true);
      setLikedPosts((p) => p.filter((post) => post.id !== post_id));
    } catch (error) {
      console.error("좋아요 해제에 실패했습니다 :", error);
    }
  };

  return (
    <LikeContainer>
      {!userInfo ? (
        <div>
          <TitleStyle>
            <h1>좋아요</h1>
          </TitleStyle>
          <p>로그인하고 관심있는 사진을 등록 해 보세요.</p>
          <button onClick={handleSignIn}>로그인하기</button>
        </div>
      ) : (
        <div>
          <TitleStyle>
            <h1>좋아요</h1>
          </TitleStyle>
          {likedPosts.length > 0 ? (
            likedPosts.map((post) => (
              <CardStyle key={post.id} id={post.id}>
                <ImageStyle src={post.imageUrl} alt={post.title} />
                <button onClick={() => handleUnlike(post.id)}>좋아요 해제</button>
              </CardStyle>
            ))
          ) : (
            <p>좋아요 한 사진이 없습니다.</p>
          )}
        </div>
      )}
    </LikeContainer>
  );
};

export default Like;
