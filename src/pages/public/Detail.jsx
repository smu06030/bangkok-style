import React, { useContext, useState } from "react";
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

  if (!post) return <div>해당 post를 찾을 수 없습니다.</div>;

  const handleAddComment = () => {
    if (inputVal.trim()) {
      setComments((prev) => [...prev, inputVal]);
      setInputVal("");
    }
  };
  return (
    <OuterDiv>
      <PostDiv>
        <span>id: {post.user_id}</span>
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
        <span>+ 99</span>
        <span>{post.hash_tag}</span>
        <span>{post.content}</span>
        <div style={{ display: "flex", gap: "5px" }}>
          <CommentInput
            placeholder="댓글을 입력해주세요"
            value={inputVal}
            onChange={(event) => {
              setInputVal(event.target.value);
            }}
          />
          <button onClick={handleAddComment}>추가</button>
        </div>
        <div>
          {comments.map((comment, index) => (
            <p key={index}>{comment}</p>
          ))}
        </div>
      </PostDiv>
    </OuterDiv>
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
