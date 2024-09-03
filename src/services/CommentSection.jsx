import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import EntireContext from "../Context/EntireContext";
import supabase from "../supabaseClient";
import { Form, useLocation, useNavigate } from "react-router-dom";
import useFetchPosts from "../hooks/useFetchPosts";
import Button from "../components/UI/Button";

const CommentSection = ({ post_id, setComments }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputVal, setInputVal] = useState("");
  const [comments, setLocalComments] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [newContent, setNewContent] = useState("");
  const [editCommentId, setEditCommentId] = useState(null);
  const { userInfo } = useContext(EntireContext);

  // 댓글 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      const { data: commentsData, error: commentsError } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", post_id);

      if (commentsError) {
        throw commentsError;
      }

      setLocalComments(commentsData);
      setComments(commentsData);
    };
    fetchComments();
  }, [post_id, setComments]);

  // 댓글 추가하기
  const handleAddComment = async (e, userInfo) => {
    e.preventDefault();
    if (!userInfo) {
      alert("로그인이 필요합니다.");
      navigate("/sign-in", { state: { backToDetail: `${location.pathname}${location.search}` } });
      return;
    }
    if (inputVal.trim()) {
      const { data, error } = await supabase
        .from("comments")
        .insert([
          { post_id: post_id, user_id: userInfo.id, content: inputVal, nickname: userInfo.user_metadata.nickname }
        ])
        .select();

      if (error) {
        console.error("댓글 추가 오류 ->", error);
        return;
      }
      setLocalComments((prev) => [...prev, data]);
      setComments((prev) => [...prev, data]);
      setInputVal("");
    }
  };

  // 댓글 삭제
  const handleDeleteComment = async (comment_id) => {
    if (!userInfo) {
      alert("로그인이 필요합니다.");
      navigate("/sign-in");
      return;
    }
    const { error } = await supabase.from("comments").delete().eq("id", comment_id);
    if (error) {
      console.log("댓글 삭제 오류 ->", error);
      return;
    }
    setLocalComments((prev) => prev.filter((p) => p.id !== comment_id));
    setComments((prev) => prev.filter((p) => p.id !== comment_id));
  };

  // 댓글 수정
  const handleEditComment = async () => {
    if (!userInfo) {
      alert("로그인이 필요합니다.");
      navigate("/sign-in");
      return;
    }
    if (newContent.trim()) {
      const { data, error } = await supabase
        .from("comments")
        .update({ content: newContent })
        .eq("id", editCommentId)
        .single();

      if (error) {
        console.log("댓글 수정 오류 ->", error);
        return;
      }
      setLocalComments((prev) => prev.map((p) => (p.id === editCommentId ? { ...p, content: newContent } : p)));
      setComments((prev) => prev.map((p) => (p.id === editCommentId ? { ...p, content: newContent } : p)));
      setEditCommentId(null);
      setNewContent("");
    }
  };
  const latestComment = comments.slice(-1)[0] || {};

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <CommentForm onSubmit={(e) => handleAddComment(e, userInfo)}>
        <CommentInput
          placeholder="댓글을 입력해주세요"
          value={inputVal}
          onChange={(event) => setInputVal(event.target.value)}
        />
        <input type="submit" value="게시" style={{ cursor: "pointer" }} />
      </CommentForm>
      <div key={post_id} style={{ marginTop: "10px", marginBottom: "10px" }}>
        <CommentBox>
          {latestComment.content ? (
            <span>
              {latestComment.nickname} : {latestComment.content}
            </span>
          ) : null}
        </CommentBox>
      </div>
      <Button onClick={toggleModal}>{`댓글 ${comments.length}개 모두 보기`}</Button>
      {isOpenModal ? (
        <ModalContainer>
          <ModalContents>
            {comments.map((comment) => (
              <CommentDiv key={comment.id}>
                {/* <p>{comment.nickname}</p> */}
                <ModalComments>
                  <p>{comment.nickname} :</p>
                  <p>{comment.content}</p>
                  <p>{comment.created_at}</p>
                </ModalComments>
                {userInfo ? (
                  <CommentButtons>
                    <Buttons
                      onClick={() => {
                        setEditCommentId(comment.id);
                        setNewContent(comment.content);
                      }}
                    >
                      수정
                    </Buttons>
                    <Buttons onClick={() => handleDeleteComment(comment.id)}>삭제</Buttons>
                  </CommentButtons>
                ) : null}
              </CommentDiv>
            ))}
            <div>
              {editCommentId && (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEditComment();
                  }}
                >
                  <ModalInputForm>
                    <input value={newContent} onChange={(e) => setNewContent(e.target.value)} />
                    <Buttons type="submit">저장</Buttons>
                    <Buttons type="button" onClick={() => setEditCommentId(null)}>
                      취소
                    </Buttons>
                  </ModalInputForm>
                </Form>
              )}

              <Buttons onClick={toggleModal}>close</Buttons>
            </div>
          </ModalContents>
        </ModalContainer>
      ) : null}
    </>
  );
};

export default CommentSection;

// Styled Components
const CommentForm = styled.form`
  display: flex;
  gap: 10px;
  input[type="submit"] {
    cursor: pointer;
    background-color: #0056b3;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #6d9fff;
    }
  }
`;

const CommentInput = styled.input`
  width: 100%;
  flex: 1;
  border: none;
  outline: none;
  border-bottom: 1px solid gray;
  ::placeholder {
    font-size: 14px;
  }
`;

const CommentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
  border: 1px solid gray;
  padding: 1em;
`;

const CommentButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Buttons = styled.button`
  background-color: #1e293b;
  padding: 10px;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 35vw;
  height: 50vh;
  padding: 1em;
  border-radius: 8px;
  background: white;
  overflow-y: auto;
  position: relative;

  p {
    margin-bottom: 1em;
  }
`;

const CommentBox = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  white-space: normal;
  width: calc(20ch + 1em);
  margin: 0;
`;

const ModalComments = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const ModalInputForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 1em;
  margin-bottom: 1em;
  input {
    padding: 10px;
    outline: none;
    flex: 1;
    margin-right: auto;
  }
`;
