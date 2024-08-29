import { useContext } from "react";
import styled from "styled-components";
import EntireContext from "../store/Context/EntireContext";
import { useNavigate } from "react-router-dom";

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
  const { isSignIn } = useContext(EntireContext);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  return (
    <LikeContainer>
      {!isSignIn ? (
        <div>
          <h1>좋아요 한 사진이 없습니다.</h1>
          <p>로그인하고 관심있는 사진을 등록 해 보세요.</p>
          <button onClick={handleSignIn}>로그인하기</button>
        </div>
      ) : (
        <div>
          <TitleStyle>
            <h1>좋아요</h1>
          </TitleStyle>
          <CardStyle>
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
            <ImageStyle src="https://s3.ap-northeast-2.amazonaws.com/blog.spartacodingclub.kr/1689745746264-Frame%201000005810.png" />
          </CardStyle>
        </div>
      )}
    </LikeContainer>
  );
};

export default Like;

/* 
  1. 인증 상태 확인 o 
  2. 비로그인 시, 로그인 하라는 컴포넌트 띄우기 o
  3. 로그인 시, '좋아요' 한 사진들 띄우기 o
  4. 사진 '좋아요' 버튼 클릭 시, '좋아요' 해제 및 좋아요 페이지에서 삭제 
  4. '좋아요' 한 사진들 클릭 시 디테일 페이지로 이동
  5. 메인 페이지에서 사진에 '좋아요' 버튼 띄우고 '좋아요' 버튼 클릭 시 해당 데이터 좋아요 페이지로 이동
*/

// {likedItems.length > 0 ? (
//   likedItems.map((item, index) => (
//     <div key={index}>
//       <img src={item.url} alt={`Liked image ${index}`} />
//     </div>
//   ))
// ) : (
//   <p>좋아요 한 사진이 없습니다.</p>
// )}
