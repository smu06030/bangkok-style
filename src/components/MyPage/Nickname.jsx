import { useState } from "react";
import supabase from "../../supabaseClient";
import styled from "styled-components";
import { toast } from "sonner";
import { useCustomSelector } from "../../hooks/useSelector";

const NicknameContainer = styled.form`
  display: flex;
  margin: 35px 0 10px 20px;
`;

const EditInput = styled.input`
  height: 20px;
  border-width: 0 0 1px;
  &:focus {
    outline: none;
  }
  text-align: center;
  font-size: 15px;
`;

const EditBtn = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  font-size: 15px;
`;

const NicknameText = styled.p`
  font-size: 20px;
`;



const Nickname = () => {
  const [updateNickname, setUpdateNickname] = useState("");
  const [edited, setEdited] = useState(false);
  const userInfo = useCustomSelector((state) => state.userInfo);
  const nickname = userInfo.user_metadata.nickname;
  const userName = userInfo.user_metadata.user_name;

  const onChangeNickname = (e) => {
    setUpdateNickname(e.target.value);
  };

  const handleNicknameUpdate = async (e) => {
    e.preventDefault();
    if (!updateNickname.trim()) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }

    await supabase.auth.updateUser({
      data: { nickname: updateNickname }
    });

    await supabase.from("posts").update({ nickname: updateNickname }).eq("user_id", userInfo.id);
    await supabase.from("comments").update({ nickname: updateNickname }).eq("user_id", userInfo.id);

    setUpdateNickname("");
    setEdited(false);
  };

  const handleNicknameEdit = (e) => {
    e.preventDefault();
    setEdited(true);
  };

  return (
    <NicknameContainer>
      {edited ? (
        <EditInput type="text" placeholder="닉네임 입력" value={updateNickname} onChange={onChangeNickname} />
      ) : (
        <NicknameText>{nickname ?? userName}</NicknameText>
      )}

      {edited ? (
        <EditBtn onClick={(e) => handleNicknameUpdate(e)}>✔️</EditBtn>
      ) : (
        <EditBtn onClick={(e) => handleNicknameEdit(e)}>✐</EditBtn>
      )}
    </NicknameContainer>
  );
};

export default Nickname;
