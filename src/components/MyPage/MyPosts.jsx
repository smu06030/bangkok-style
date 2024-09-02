import { useEffect, useState, useContext } from "react";
import supabase from "../../supabaseClient";
import styled from "styled-components";
import EntireContext from "../../Context/EntireContext";

const Container = styled.div`
  padding: 50px 100px;
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
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
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const PostTitle = styled.p`
  font-size: 15x;
  padding: 10px;
`;

const MyPosts = () => {
  const [myPostList, setPostList] = useState([]);
  const { userInfo } = useContext(EntireContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await supabase.from("posts").select("*");
      const mypost = response.data.filter((p) => p.user_id === userInfo.id);
      setPostList(mypost);
    };
    fetchPosts();
  }, []);

  return (
    <Container>
      {myPostList ? (
        myPostList.map((post) => (
          <Card key={post.id}>
            <PostImg src={post.img_url} alt="게시글 이미지" />
            <PostTitle>{post.title}</PostTitle>
          </Card>
        ))
      ) : (
        <p>등록된 글이 없습니다.</p>
      )}
    </Container>
  );
};

export default MyPosts;
