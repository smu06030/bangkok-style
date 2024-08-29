import styled from "styled-components";
import supabase from "../../supabaseClient";
import { useEffect, useRef, useState } from "react";
// import EntireContext from "../../store/Context/EntireContext";

const UpLoad = () => {
  const { data } = supabase.storage.from("fashions").getPublicUrl("default-img.png");
  // console.log("fashionImg : ", fashionImg);

  const [fashionUrl, setFashionUrl] = useState("");
  const fileInputRef = useRef(null);
  const fashionImg = data.publicUrl;
  //console.log("fashionUrl :", fashionUrl);
  // const { isSignIn } = useContext(EntireContext);

  //
  //
  // 맨 처음 랜더링 시 checkFashion() 호출
  useEffect(() => {
    checkFashion();
  }, []);
  function checkFashion() {
    const { data } = supabase.storage.from("fashions").getPublicUrl("default-img.png");
    setFashionUrl(data.publicUrl);
  }

  //
  //
  // storage에 파일 업로드 함수
  async function handleFileInputChange(files) {
    const [file] = files;

    if (!file) {
      return;
    }
    const { data } = await supabase.storage.from("fashions").upload(`fashion_${Date.now()}.png`, file);
    // setFashionUrl(`fashions/${data.path}`);
    setFashionUrl(`https://bangkok-style.supabase.co/storage/v1/object/public/fashions/${data.path}`);
    // const { publicUrl } = supabase.storage.from("fashions").getPublicUrl(data.path);
    // setFashionUrl(publicUrl);
  }
  console.log("fashionUrl :", fashionUrl);

  //업로드한 파일 불러오는 함수

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
            src={fashionUrl}
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
