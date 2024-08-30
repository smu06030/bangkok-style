import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import EntireContext from "../../store/Context/EntireContext";

const Detail = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const postId = queryParams.get("id");
  const { posts } = useContext(EntireContext);
  const post = posts.posts.find((post) => post.id === Number(postId));
  const [inputVal, setInputVal] = useState("");
  const [comments, setComments] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // 댓글 불러오기
  useEffect(() => {
    const storedComments = localStorage.getItem(`comments_${postId}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
      console.log("로컬스토리지 데이터 ->", JSON.parse(storedComments));
    }
  }, [postId]);

  const lattestComment = comments.slice(-1)[0];

  if (!post) return <div>해당 post를 찾을 수 없습니다.</div>;

  // 댓글 추가
  const handleAddComment = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      const newComments = [...comments, inputVal];
      setComments(newComments);
      localStorage.setItem(`comments_${postId}`, JSON.stringify(newComments));
      setInputVal("");
    }
  };

  // 모달 열기, 닫기
  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  return (
    <>
      <OuterDiv>
        <PostDiv>
          <span>id: {post.user_id}</span>
          <span>id: {post.id}</span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5QPTO0dfQhrhSVMfjUTjj-7uh1zyqNnjYCg&s"
            alt=""
          />
          {/* <img src={post.img_url} alt="" /> */}
          <span style={{ marginTop: "5px" }}>
            {post.like ? (
              <Heart src="https://velog.velcdn.com/images/bsjaehee94/post/589d104f-1104-43db-980a-548d879ef168/image.png" />
            ) : (
              <Heart src="https://velog.velcdn.com/images/bsjaehee94/post/09517912-428c-4edb-871e-8b474c141ad9/image.png" />
            )}
          </span>
          <span>{post.hash_tag}</span>
          <span>{post.content}</span>
          <CommentForm onSubmit={handleAddComment}>
            <CommentInput
              placeholder="댓글을 입력해주세요"
              value={inputVal}
              onChange={(event) => {
                setInputVal(event.target.value);
              }}
            />
            <input type="submit" value="게시" />
          </CommentForm>
          <div style={{ marginTop: "1em", marginBottom: "1em" }}>작성자 : {lattestComment}</div>
          <button onClick={toggleModal}>{`댓글 ${comments.length}개 모두 보기`}</button>
        </PostDiv>
      </OuterDiv>
      {isOpenModal ? (
        <ModalContainer>
          <ModalContents>
            {comments.map((comment) => (
              <p key={comment.id}>{comment}</p>
            ))}
            <button onClick={toggleModal}>close</button>
          </ModalContents>
        </ModalContainer>
      ) : null}
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

const CommentInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  border-bottom: 1px solid gray;
  ::placeholder {
    font-size: 14px;
  }
`;

const Heart = styled.img`
  width: 20px;
  height: 20px;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  width: 100vw;
  min-height: calc(100vh - 80px);
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContents = styled.div`
  width: 35vw;
  height: 50vh;
  padding: 1em;
  border-radius: 8px;
  background: white;
`;

const CommentForm = styled.form`
  display: flex;
  gap: 10px;
`;
