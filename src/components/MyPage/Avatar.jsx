import { useEffect, useRef, useState } from "react";
import supabase from "../../supabaseClient";
import styled from "styled-components";
import { useCustomSelector } from "../../hooks/useSelector";

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 70%;
  overflow: hidden;
  cursor: pointer;
`;

const Avatar = () => {
  const [profileUrl, setProfileUrl] = useState("");
  const userInfo = useCustomSelector((state) => state.userInfo);
  const fileInputRef = useRef(null);

  useEffect(() => {
    checkProfile();
  }, []);

  // 프로필 가져오기
  const checkProfile = async () => {
    // 유저정보에 fileName 이 존재하면 업데이트한 파일을, 없을 경우 기본프로필 보여주기
    if (userInfo.user_metadata.fileName) {
      const {
        data: { publicUrl }
      } = await supabase.storage.from("avatars").getPublicUrl(userInfo.user_metadata.fileName);
      setProfileUrl(publicUrl);
    } else {
      const {
        data: { publicUrl }
      } = await supabase.storage.from("avatars").getPublicUrl("default-profile.jpg");
      setProfileUrl(publicUrl);
    }
  };

  // 프로필 변경
  const handleFileInputChange = async (e) => {
    // input에서 타입이 file인 것 가져오기
    const files = e.target.files;
    // files는 타입이 항상 배열형태 -> 구조분해할당
    const [file] = files;

    if (!file) {
      return;
    }
    // fileName 지정 (new Date.getTime으로 파일명 한글/영어 관계없도록, supabase 한글지원x)
    const fileName = `${new Date().getTime()}`;

    await supabase.storage.from("avatars").upload(fileName, file);
    const newProfileUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`;
    setProfileUrl(newProfileUrl);

    await supabase.auth.updateUser({ data: { fileName: fileName } });
  };

  return (
    <>
      <input onChange={handleFileInputChange} type="file" ref={fileInputRef} hidden />
      <ProfileImg src={profileUrl} alt="profile" onClick={() => fileInputRef.current.click()} />
    </>
  );
};

export default Avatar;
