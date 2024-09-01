import { useContext, useEffect, useRef, useState } from "react";
import supabase from "../../supabaseClient";
import styled from "styled-components";
import EntireContext from "../../store/Context/EntireContext";

const ProfileImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 70%;
  overflow: hidden;
  cursor: pointer;
`;

const Avatar = () => {
  const [profileUrl, setProfileUrl] = useState("");
  const { userInfo } = useContext(EntireContext);
  const fileInputRef = useRef(null);

  useEffect(() => {
    checkProfile();
  }, []);

  const checkProfile = async () => {
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

  const handleFileInputChange = async (e) => {
    const files = e.target.files;
    const [file] = files;

    if (!file) {
      return;
    }

    const fileName = `${file.name}-${Math.random()}`;

    const { data, error } = await supabase.storage.from("avatars").upload(fileName, file);
    console.log(data);
    console.log(error);
    const newProfileUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`;
    setProfileUrl(newProfileUrl);
    const { error: updateError } = await supabase.auth.updateUser({
      data: { fileName: fileName }
    });
  };

  return (
    <>
      <input onChange={handleFileInputChange} type="file" ref={fileInputRef} hidden />
      <ProfileImg width={45} height={45} src={profileUrl} alt="profile" onClick={() => fileInputRef.current.click()} />
    </>
  );
};

export default Avatar;
