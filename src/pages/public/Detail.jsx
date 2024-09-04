import styled from "styled-components";
// import useFetchPosts from "../../hooks/useFetchPosts";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Like, LikeActive } from "../../assets/images/Likes";
import updateLikeStatus from "../../services/likeService";
import Button from "../../components/UI/Button";
import { useCustomSelector } from "../../hooks/useSelector";
import useFetchPosts from "../../hooks/useFetchPosts";
import CommentSection from "../../components/Layout/CommentSection";
const Detail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const post_id = queryParams.get("id");
  const userInfo = useCustomSelector((state) => state.userInfo);
  const { allPosts } = useCustomSelector((state) => state.posts);
  const [isLike, setIsLike] = useState(false);
  const post = useMemo(() => allPosts.find((post) => post.id === Number(post_id)), [allPosts]);
  useFetchPosts();

  // 좋아요 상태
  const toggleLike = async () => {
    if (!userInfo) {
      alert("로그인이 필요합니다.");
      navigate("/sign-in");
      return;
    }
    const newLikeStatus = !isLike;
    setIsLike(newLikeStatus);
    await updateLikeStatus(post.id, userInfo.id, !newLikeStatus);
  };

  if (!post) {
    return <div>Loading...</div>; // 데이터가 없을 때 로딩 화면
  }

  const handleClick = (postId) => {
    navigate(`/modify?postId=${postId}`);
  };

  return (
    <>
      <OuterDiv>
        <PostDiv>
          <span>작성자 : {post.nickname}</span>
          <PostImg src={post.img_url} alt={post.id} />
          <span style={{ marginTop: "5px" }}>
            <span onClick={toggleLike}>
              {!isLike ? <Like width="24" height="24" /> : <LikeActive width="24" height="24" />}
            </span>
          </span>
          <span style={{ color: "#6d9fff" }}>{post.hash_tag}</span>
          <PostTitle>{post.title}</PostTitle>
          <span style={{ width: "400px" }}>{post.content}</span>
          <CommentSection post_id={post_id} />
          <div onClick={() => handleClick(post.id)}>
            {userInfo && userInfo.id === post.user_id ? <Button>수정</Button> : null}
          </div>
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
  max-width: 40%;
  margin: 20px auto;
  span {
    margin-bottom: 10px;
  }
  @media (max-height: 720px) {
    margin: 10px auto;
  }
`;

const PostDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  height: auto;
  max-width: 100%;
  border: 1px solid lightgray;
  padding: 1em;
  border-radius: 1rem;
  overflow: hidden;
  @media (max-height: 720px) {
    height: auto;
  }
`;

const PostTitle = styled.h3`
  font-weight: 700;
  margin-bottom: 10px;
`;

const PostImg = styled.img`
  width: 100%;
  max-height: 400px;
  margin: 0px auto;
  @media (max-height: 720px) {
    width: 400px;
    height: 350px;
  }
`;
