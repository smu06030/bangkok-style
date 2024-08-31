import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import EntireContext from "../Context/EntireContext";
import { useNavigate } from "react-router-dom";
import SignIn from "./public/SignIn";

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
  const { usrInfo } = useContext(EntireContext);
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/sign-in");
  };

  const [likedPhotos, setLikedPhotos] = useState([]);

  useEffect(() => {
    // 좋아요 한 사진 데이터를 불러오는 로직
    const fetchLikedPhotos = async () => {
      const savedPhotos = await getLikedPhotosFromDB(); // DB에서 데이터 가져오기
      setLikedPhotos(savedPhotos);
    };

    fetchLikedPhotos();
  }, []);

  const handleUnlike = (event, photoID) => {
    saveButtonEvent(event);
    setLikedPhotos((prevPhotos) => prevPhotos.filter((id) => id !== photoID));
  };

  return (
    <LikeContainer>
      {!usrInfo ? (
        <div>
          <TitleStyle>
            <h1>좋아요</h1>
          </TitleStyle>
          <p>로그인하고 관심있는 사진을 등록 해 보세요.</p>
          <button onClick={handleSignIn}>로그인하기</button>
        </div>
      ) : (
        <div>
          <TitleStyle>
            <h1>좋아요</h1>
          </TitleStyle>
          {likedPhotos.length > 0 ? (
            likedPhotos.map((photoID, index) => (
              <CardStyle>
                <div key={index} id={photoID}>
                  <ImageStyle img src={`https://example.com/${photoID}.jpg`} alt={`Photo ${index + 1}`} />
                  <button onClick={(event) => handleUnlike(event, photoID)}>좋아요 해제</button>
                </div>
              </CardStyle>
            ))
          ) : (
            <p>좋아요 한 사진이 없습니다.</p>
          )}
        </div>
      )}
    </LikeContainer>
  );
};

export default Like;

/* 
  1. 인증 상태 확인 
  2. 비로그인 시, 로그인 하라는 컴포넌트 띄우기 
  3. 로그인 시, '좋아요' 한 사진들 띄우기 
  4. 사진 '좋아요' 버튼 클릭 시, '좋아요' 해제 및 좋아요 페이지에서 삭제 
  4. '좋아요' 한 사진들 클릭 시 디테일 페이지로 이동
  5. 메인 페이지에서 사진에 '좋아요' 버튼 띄우고 '좋아요' 버튼 클릭 시 해당 데이터 좋아요 페이지로 이동
*/
