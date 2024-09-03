import supabase from "../../supabaseClient";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EntireContext from "../../Context/EntireContext";
import { Toaster, toast } from "sonner";
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
  console.log("userInfo", userInfo.identities[0].identity_data.nickname);
  const nickName = userInfo.identities[0].identity_data.nickname;
  console.log("nickName", nickName);

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
    if (title.length === 0) {
      toast.error("제목을 입력해주세요");
      return;
    } else if (content.length === 0) {
      toast.error("내용을 입력해주세요");
      return;
    } else if (fashionUrl.length === 0) {
      toast.error("사진을 등록해주세요");
      return;
    } else {
      try {
        await supabase.from("posts").insert([
          {
            title,
            content,
            hash_tag: hashtags,
            img_url: fashionUrl,
            user_id: loginUserId,
            nickname: nickName
          }
        ]);
      } catch (error) {
        console.error("Error uploading post:", error);
      } finally {
        toast.success("게시글이 등록되었습니다.");
        setTimeout(function () {
          navigate("/");
        }, 2000);
      }
    }
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
      <Toaster position="top-center" richColors />
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
            <div style={{ marginTop: "10px" }}>
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
              <Button onClick={createPost} style={{ backgroundColor: "#0056b3", color: "white" }}>
                업로드
              </Button>
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
