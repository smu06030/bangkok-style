import React, { useContext, useState } from "react";
import styled from "styled-components";

const LikeStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const CardStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 0;
`;

const Like = () => {
  return (
    <LikeStyle>
      {!isSignIn ? (
        <div>
          <h1>좋아요 한 사진이 없습니다.</h1>
          <p>로그인하고 관심있는 사진을 등록 해 보세요.</p>
          <button>로그인하기</button>
        </div>
      ) : (
        <div>
          <h1>좋아요</h1>
          <CardStyle>
            <img src="https://imgnews.pstatic.net/image/005/2018/05/10/201805100506_11140923946724_1_20180510050718283.jpg?type=w647" />
          </CardStyle>
        </div>
      )}
    </LikeStyle>
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
