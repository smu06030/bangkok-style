import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

const Nickname = () => {
  const [nickname, setNickname] = useState("");
  const [updateNickname, setUpdateNickname] = useState("");

  useEffect(() => {
    checkNickname();
  }, []);

  const checkNickname = async () => {
    const {
      data: { user }
    } = await supabase.auth.getUser();
    setNickname(user.user_metadata.nickname.updateNickname);
  };

  const handleNicknameChange = (e) => {
    setUpdateNickname(e.target.value);
  };

  const handleNicknameUpdate = async () => {
    const { error: updateError } = await supabase.auth.updateUser({
      data: { nickname: { updateNickname } }
    });
    setNickname(updateNickname);
  };

  return (
    <>
      <h2>{nickname}</h2>
      <input type="text" placeholder="변경 닉네임" value={updateNickname} onChange={handleNicknameChange} />
      <button onClick={handleNicknameUpdate}>수정</button>
    </>
  );
};

export default Nickname;
