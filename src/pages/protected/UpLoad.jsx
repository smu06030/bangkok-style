import styled from "styled-components";
import supabase from "../../supabaseClient";
import { useRef, useState } from "react";

const UpLoad = () => {
  const { data } = supabase.storage.from("fashions").getPublicUrl("default-img.png");

  const [fashionUrl, setFashionUrl] = useState("");
  const fileInputRef = useRef(null);
  const fashionImg = data.publicUrl;

  console.log("fashionImg : ", fashionImg);
  console.log("fashionUrl :", fashionUrl);

  async function handleFileInputChange(files) {
    const [file] = files;

    if (!file) {
      return;
    }

    const { data } = await supabase.storage.from("fashions").upload(`fashion_${Date.now()}.png`, file);

    setFashionUrl(`https://<project>.supabase.co/storage/v1/object/public/fashions/${data.path}`);
  }

  return (
    <>
      <UpLoadContainer>
        <ImagesDiv>
          <input
            onChange={(e) => handleFileInputChange(e.target.files)}
            type="file"
            ref={fileInputRef}
            className="hidden"
          />
          <img
            className="rounded-full cursor-pointer w-[45px] h-[45px]"
            width={45}
            height={45}
            src={fashionImg}
            alt="myFashion"
            onClick={() => fileInputRef.current.click()}
          />
          이미지영역
        </ImagesDiv>
        <InputDiv>
          <input type="text" />
          <textarea name="" id="" />
        </InputDiv>
        <ButtonDiv>
          <Button>수정</Button>
          <Button>업로드</Button>
        </ButtonDiv>
        <div>태그영역</div>
      </UpLoadContainer>
    </>
  );
};

export default UpLoad;

const UpLoadContainer = styled.div`
  border: 1px solid gray;
`;

const ImagesDiv = styled.div`
  border: 1px solid gray;
`;

const InputDiv = styled.div`
  border: 1px solid gray;
`;

const ButtonDiv = styled.div`
  border: 1px solid gray;
`;

const Button = styled.button``;
