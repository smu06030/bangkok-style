import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import URLS from "../../constant/urls";
import { useCustomSelector } from "../../hooks/useSelector";

const Container = styled.div`
  padding: 50px 100px;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  text-align: center;
`;

const Card = styled.div`
  cursor: pointer;
  transition: box-shadow 0.3s ease;
  border-radius: 8px;
  &:hover {
    box-shadow: 1px 1px 20px #ddd;
  }
`;

const PostImg = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 8px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PostTitle = styled.p`
  font-size: 15x;
  padding: 10px;
`;

const EditBtn = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #e4e4e4;
  font-size: 13px;
  margin: 5px 5px 5px 0;
  cursor: pointer;
  &:hover {
    background-color: #d2d2d2;
  }
`;

const ContentsNone = styled.p`
  grid-column: 1 / -1;
`;

const MyPosts = () => {
  const [myPostList, setMyPostList] = useState([]);
  const navigate = useNavigate();
  const userInfo = useCustomSelector((state) => state.userInfo);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await supabase.from("posts").select("*");
      const mypost = response.data.filter((p) => p.user_id === userInfo.id);
      setMyPostList(mypost);
    };
    fetchPosts();
  }, []);

  const moveToDetailPage = (postId) => {
    navigate(`${URLS.detail}?id=${postId}`);
  };

  const moveToModifyPage = (e, postId) => {
    e.stopPropagation();
    navigate(`${URLS.modify}?id=${postId}`);
  };

  return (
    <Container>
      {myPostList.length > 0 ? (
        myPostList.map((post) => (
          <Card
            key={post.id}
            onClick={() => {
              moveToDetailPage(post.id);
            }}
          >
            <PostImg src={post.img_url} alt="게시글 이미지" />
            <TitleBox>
              <PostTitle>{post.title}</PostTitle>
              <EditBtn
                type="button"
                onClick={(e) => {
                  moveToModifyPage(e, post.id);
                }}
              >
                수정
              </EditBtn>
            </TitleBox>
          </Card>
        ))
      ) : (
        <ContentsNone>등록된 게시물이 없습니다.</ContentsNone>
      )}
    </Container>
  );
};

export default MyPosts;
