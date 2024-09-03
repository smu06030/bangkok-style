import { useState } from "react";
import supabase from "../../supabaseClient";
import styled from "styled-components";
import { toast } from "sonner";
import { useCustomSelector } from "../../hooks/useSelector";

const NicknameContainer = styled.div`
  display: flex;
  margin: 15px 0 0 18px;
`;

const EditInput = styled.input`
  border: 1px solid #c0c0c0;
  border-radius: 5px;
  height: 20px;
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

  const handleNicknameChange = (e) => {
    setUpdateNickname(e.target.value);
  };

  const handleNicknameUpdate = async () => {
    if (!updateNickname.trim()) {
      toast.error("닉네임을 입력해주세요.");
      return;
    }

    const { data } = await supabase.auth.updateUser({
      data: { nickname: updateNickname }
    });
    setUpdateNickname("");
    setEdited(false);
  };

  const handleNicknameEdit = () => {
    setEdited(true);
  };

  return (
    <NicknameContainer>
      {edited ? (
        <EditInput type="text" placeholder="닉네임 입력" value={updateNickname} onChange={handleNicknameChange} />
      ) : (
        <NicknameText>{nickname ?? userName}</NicknameText>
      )}

      {edited ? (
        <EditBtn type="button" onClick={handleNicknameUpdate}>
          ✔
        </EditBtn>
      ) : (
        <EditBtn type="button" onClick={handleNicknameEdit}>
          ✐
        </EditBtn>
      )}
    </NicknameContainer>
  );
};

export default Nickname;
