import React, { useEffect, useState } from "react";
import styled from "styled-components";
import supabase from "../../supabaseClient";
import { useLocation } from "react-router-dom";

const Detail = () => {
  const location = useLocation();
  const UrlParameter = new URLSearchParams(location.search);

  const [posts, setPosts] = useState([]);
  const [isLike, setIsLike] = useState(false);
  const getPosts = async () => {
    let { data: posts, error } = await supabase.from("posts").select("*");
    if (error) {
      console.log(error);
    }
    setPosts(posts);
  };
  useEffect(() => {
    getPosts();
  }, []);

  console.log(posts);
  const handleHeartClick = () => {
    setIsLike((prev) => !prev);
  };
  return (
    <OuterDiv>
      {posts.map((post) => (
        <Div key={post.id}>
          <UserName>{post.username}</UserName>
          <InnerDiv>
            <Img src={post.img_url} alt="post image" />
          </InnerDiv>
          <TextDiv>
            <span onClick={handleHeartClick}>
              <img
                style={{ width: "1em" }}
                src={
                  isLike
                    ? "https://velog.velcdn.com/images/bsjaehee94/post/589d104f-1104-43db-980a-548d879ef168/image.png"
                    : "https://velog.velcdn.com/images/bsjaehee94/post/09517912-428c-4edb-871e-8b474c141ad9/image.png"
                }
                alt="heart icon"
              />
            </span>

            <span>{post.hash_tag}</span>
            <span>{post.content}</span>
            <span>댓글을 남겨주세요.</span>
          </TextDiv>
        </Div>
      ))}
    </OuterDiv>
  );
};

export default Detail;

const OuterDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 20%;
  height: 50%;

  span {
    margin-bottom: 10px;
  }
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  padding: 1em;
  width: 100%;
  border-radius: 1rem;
`;

const InnerDiv = styled.div`
  margin: auto;
`;

const UserName = styled.p`
  margin: 15px;
`;
const Img = styled.img`
  flex: 1;
  max-width: 100%;
  max-height: 60vh;
  object-fit: contain;
  margin-bottom: 1em;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1%;
`;
