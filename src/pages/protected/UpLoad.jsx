import styled from "styled-components";
import supabase from "../../supabaseClient";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import EntireContext from "../../Context/EntireContext";

const UpLoad = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [hashtags, setHashtags] = useState([]); // 해시태그를 저장할 배열 상태
  const [inputValue, setInputValue] = useState(""); // 입력된 값

  const [previewUrls, setPreviewUrls] = useState(""); // 이미지 프리뷰 상태 추가
  const [fashionUrl, setFashionUrl] = useState("");

  const fileInputRef = useRef(null);

  const { userInfo } = useContext(EntireContext);
  //console.log("userInfo==>", userInfo);

  const loginUserId = userInfo.id;

  const navigate = useNavigate();

  //=========================================================
  // 메인페이지 +버튼 클릭 시
  // 메인페이지 -> 업로드페이지(작성되지 않은 상태 업로드가능)
  // 마이페이지 게시글 클릭 시
  // 마이페이지 -> 업로드페이지(작성된 상태 수정가능)
  //=========================================================

  // 게시글 가져오기
  // async function getPosts() {
  //   const { data } = await supabase.from("posts").select();
  //   // (미구현)
  //   setPosts(data);
  // }

  // 게시글 수정하기
  async function updatePost(id) {
    const { data } = await supabase
      .from("posts")
      .update({
        id: "입력?", //
        created_at: Date.now(),
        title: prompt("수정할 제목을 입력해주세요."),
        content: prompt("수정할 내용을 입력해주세요."),
        user_id: loginUserId,
        hash_tag: ["#멋쟁이", "#데일리"],
        img_url: prompt("수정할 이미지")
      })
      .eq("id", id)
      .select();

    const [updatedPost] = data;
    const updatedList = posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));

    setPosts(updatedList);
  }

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
    // setFashionUrl(previewUrl);
  }
  //!SECTIONconsole.log("fashionUrl=>", fashionUrl);

  // 업로드 버튼
  const createPost = async (e) => {
    e.preventDefault();
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
      // Enter 키를 눌렀을 때, 입력된 값이 비어있지 않다면
      setHashtags([...hashtags, inputValue.trim()]); // 새로운 해시태그를 배열에 추가
      setInputValue(""); // 입력 필드 초기화
    }
  };

  const removeHashTag = (idx) => {
    setHashtags(hashtags.filter((_, i) => i !== idx));
  };

  // 최초 랜더링 시 호출
  useEffect(() => {
    checkFashion();
    // getPosts();
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
              />
              <input
                onChange={(e) => handleFilePreviewChange(e.target.files)}
                type="file"
                ref={fileInputRef}
                className="hidden"
                style={{ display: "none" }}
              />
            </ImagesDiv>
            <div>
              <p>제목</p>
              <InputTitle
                type="text"
                placeholder="제목을 입력해주세요."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>

            <div>
              <p>내용</p>
              <InputTextarea
                placeholder="내용을 입력해주세요."
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </div>
            <BtnDiv>
              <Button onClick={updatePost}>수정</Button>
              <Button onClick={createPost}>업로드</Button>
            </BtnDiv>
            <div>
              <p>해시태그</p>
              <input
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
                  <span key={idx} style={{ marginRight: "8px" }}>
                    {tag}
                    <button
                      onClick={() => {
                        removeHashTag(idx);
                      }}
                    >
                      X
                    </button>
                  </span>
                ))}
              </div>
            </div>
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

const UpLoadContainer = styled.div`
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
`;

const ImagesDiv = styled.div`
  border: 1px solid gray;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Img = styled.img`
  margin: 10px;
  height: 200px;
  width: 200px;
`;
const InputDiv = styled.div`
  border: 1px solid gray;
`;
const InputTitle = styled.input``;

const InputTextarea = styled.textarea`
  width: 100%;
`;

const BtnDiv = styled.div`
  border: 1px solid gray;
`;

const Button = styled.button``;
