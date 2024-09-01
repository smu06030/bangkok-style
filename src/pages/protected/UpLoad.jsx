import supabase from "../../supabaseClient";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EntireContext from "../../Context/EntireContext";
import {
  BtnDiv,
  Button,
  ButtonX,
  HashInput,
  ImagesDiv,
  Img,
  InputTextarea,
  InputTitle,
  P,
  Span,
  UpLoadContainer
} from "../../styles/UpLoadStyle";

const UpLoad = () => {
  // const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [previewUrls, setPreviewUrls] = useState("");
  const [fashionUrl, setFashionUrl] = useState("");

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { userInfo } = useContext(EntireContext);
  const loginUserId = userInfo.id;

  // 기본이미지 가져오기
  function checkFashion() {
    const { data } = supabase.storage.from("fashions").getPublicUrl("default-img.png");
    setPreviewUrls(data.publicUrl);
  }

  // 이미지 프리뷰 함수
  async function handleFilePreviewChange(files) {
    const [file] = files;
    if (!file) {
      return;
    }
    //이미지 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrls(previewUrl);
    // 스토리지에 업로드
    const filePath = `fashion_${Date.now()}`;
    const { data, error } = await supabase.storage.from("fashions").upload(filePath, file);
    if (error) return;
    setFashionUrl(`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/fashions/${data.path}`);
  }

  // 업로드 버튼
  const createPost = async (e) => {
    e.preventDefault();

    // if (title.length === 0) {
    //   setError("제목을 입력해주세요.");
    //   return;
    // } else if (content.length === 0) {
    //   setError("내용을 입력해주세요");
    //   return;
    // } else {
    //   setError("");
    // }
    await supabase.from("posts").insert([
      {
        title,
        content,
        hash_tag: hashtags,
        img_url: fashionUrl,
        user_id: loginUserId
      }
    ]);
    navigate("/");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setHashtags([...hashtags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeHashTag = (idx) => {
    setHashtags(hashtags.filter((_, i) => i !== idx));
  };

  useEffect(() => {
    checkFashion();
  }, []);

  return (
    <>
      {userInfo ? (
        <div>
          <UpLoadContainer>
            <ImagesDiv>
              <Img
                className="rounded-full cursor-pointer w-[45px] h-[45px]"
                width={45}
                height={45}
                src={previewUrls}
                alt="myFashion"
                onClick={() => fileInputRef.current.click()}
                style={{ cursor: "pointer" }}
              />
              <input
                onChange={(e) => handleFilePreviewChange(e.target.files)}
                type="file"
                ref={fileInputRef}
                className="hidden"
                style={{ display: "none" }}
              />
            </ImagesDiv>
            <div style={{ marginTop: "20px" }}>
              <P>제목</P>
              <InputTitle
                type="text"
                placeholder="제목을 입력해주세요."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            <div style={{ marginTop: "20px" }}>
              <P>내용</P>
              <InputTextarea
                placeholder="내용을 입력해주세요."
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
            <div style={{ marginTop: "20px" }}>
              <P>해시태그</P>
              <HashInput
                type="text"
                value={inputValue}
                onChange={(e) => {
                  const value = e.target.value;
                  setInputValue(value.startsWith("#") ? value : "#" + value);
                }}
                onKeyPress={handleKeyPress}
                placeholder="내용을 입력하고 엔터를 누르세요"
              />
              <div>
                {hashtags.map((tag, idx) => (
                  <Span key={idx} style={{ marginRight: "8px" }}>
                    {tag}
                    <ButtonX
                      onClick={() => {
                        removeHashTag(idx);
                      }}
                    >
                      X
                    </ButtonX>
                  </Span>
                ))}
              </div>
            </div>
            <BtnDiv>
              {/* <Button onClick={updatePost}>수정</Button> */}
              <Button onClick={createPost}>업로드</Button>
            </BtnDiv>
          </UpLoadContainer>
        </div>
      ) : (
        <button
          onClick={() => {
            navigate("/sign-up");
          }}
        >
          회원가입페이지로 이동
        </button>
      )}
    </>
  );
};

export default UpLoad;
