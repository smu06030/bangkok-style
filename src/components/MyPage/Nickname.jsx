import React, { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

const Nickname = () => {
  const [nickname, setNickname] = useState("");

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  async function handleNicknameUpdate() {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    console.log(user.user_metadata.nickname);

    const { data, error } = await supabase.auth.updateUser({
      data: { nickname: "world" }
    });
  }

  useEffect(() => {
    handleNicknameUpdate();
  }, []);

  return (
    <>
      <h2>NickName</h2>;
      <input type="text" placeholder="닉네임 수정" onChange={handleNicknameChange} />
    </>
  );
};

export default Nickname;
