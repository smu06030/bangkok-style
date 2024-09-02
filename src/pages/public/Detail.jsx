import styled from "styled-components";
import useFetchPosts from "../../hooks/useFetchPosts";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Like, LikeActive } from "../../assets/images/Likes";
import updateLikeStatus from "../../services/likeService";
import CommentSection from "../../services/CommentSection";
import Button from "../../components/UI/Button";
import EntireContext from "../../Context/EntireContext";

const Detail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const post_id = queryParams.get("id");
  const { userInfo } = useFetchPosts();
  const { allPosts } = useContext(EntireContext);
  const [post, setPost] = useState(null);
  const [isLike, setIsLike] = useState(false);

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
          <CommentSection
            post_id={post_id}
            setComments={(comments) => setPost((prevPost) => ({ ...prevPost, comments }))}
          />
          <Button onClick={() => handleClick(post.id)}>수정</Button>
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
