import { useEffect, useRef, useState } from "react";
import supabase from "../../supabaseClient";
import styled from "styled-components";

const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 70%;
  overflow: hidden;
`;

const Avatar = () => {
  const [profileUrl, setProfileUrl] = useState("");
  const fileInputRef = useRef(null);

  const checkProfile = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user.user_metadata.fileName) {
      const {
        data: { publicUrl }
      } = await supabase.storage.from("avatars").getPublicUrl(user.user_metadata.fileName);
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
    const newProfileUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`;
    setProfileUrl(newProfileUrl);
    const { error: updateError } = await supabase.auth.updateUser({
      data: { fileName: fileName }
    });
  };

  useEffect(() => {
    checkProfile();
  }, []);

  return (
    <>
      <input onChange={handleFileInputChange} type="file" ref={fileInputRef} hidden />
      <ProfileImg width={45} height={45} src={profileUrl} alt="profile" onClick={() => fileInputRef.current.click()} />
    </>
  );
};

export default Avatar;
