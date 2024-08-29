import { useEffect, useRef, useState } from "react";
import supabase from "../../supabaseClient";

const Avatar = () => {
  const [profileUrl, setProfileUrl] = useState("");
  const fileInputRef = useRef(null);

  async function checkProfile() {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log(user);
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
  }

  async function handleFileInputChange(e) {
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
    console.log(`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`);
    setProfileUrl(newProfileUrl);
    const { error: updateError } = await supabase.auth.updateUser({
      data: { fileName: fileName }
    });
  }

  useEffect(() => {
    checkProfile();
  }, []);
  console.log(profileUrl);
  return (
    <>
      <input onChange={handleFileInputChange} type="file" ref={fileInputRef} className="hidden" />
      <img
        className="rounded-full cursor-pointer w-[45px] h-[45px]"
        width={45}
        height={45}
        src={profileUrl}
        alt="profile"
        onClick={() => fileInputRef.current.click()}
      />
    </>
  );
};

export default Avatar;
