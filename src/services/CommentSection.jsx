// CommentSection.js
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import EntireContext from "../Context/EntireContext";
import supabase from "../supabaseClient";
import { Form } from "react-router-dom";

const CommentSection = ({ post_id, setComments }) => {
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
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (inputVal.trim()) {
      const { data, error } = await supabase
        .from("comments")
        .insert([{ post_id: post_id, user_id: userInfo.id, content: inputVal }])
        .single();

      if (error) {
        console.error("댓글 추가 오류 ->", error);
        return;
      }
      setLocalComments((prev) => [...prev, data]);
      setComments((prev) => [...prev, data]);
      setInputVal("");
    }
  };

  const handleDeleteComment = async (comment_id) => {
    const { error } = await supabase.from("comments").delete().eq("id", comment_id);
    if (error) {
      console.log("댓글 삭제 오류 ->", error);
      return;
    }
    setLocalComments((prev) => prev.filter((p) => p.id !== comment_id));
    setComments((prev) => prev.filter((p) => p.id !== comment_id));
  };

  const handleEditComment = async () => {
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

  // 닉네임

  return (
    <>
      <CommentForm onSubmit={handleAddComment}>
        <CommentInput
          placeholder="댓글을 입력해주세요"
          value={inputVal}
          onChange={(event) => setInputVal(event.target.value)}
        />
        <input type="submit" value="게시" style={{ cursor: "pointer" }} />
      </CommentForm>
      <div key={post_id} style={{ marginTop: "10px", marginBottom: "10px" }}>
        {latestComment.content}
      </div>
      <Buttons onClick={toggleModal}>{`댓글 ${comments.length}개 모두 보기`}</Buttons>
      {isOpenModal ? (
        <ModalContainer>
          <ModalContents>
            {comments.map((comment) => (
              <CommentDiv key={comment.id}>
                {/* <p>{comment.nickname}</p> */}
                <p>{comment.content}</p>
                {
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
                }
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
                  <input value={newContent} onChange={(e) => setNewContent(e.target.value)} />
                  <Buttons type="submit">저장</Buttons>
                  <Buttons type="button" onClick={() => setEditCommentId(null)}>
                    취소
                  </Buttons>
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
`;

const CommentButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Buttons = styled.button`
  cursor: pointer;
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
  button {
    margin-bottom: 1em;
  }
  p {
    margin-bottom: 1em;
  }
`;
