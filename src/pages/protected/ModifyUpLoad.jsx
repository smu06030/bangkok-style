import styled from "styled-components";
import { useLocation } from "react-router-dom";
import supabase from "../../supabaseClient";
import { useContext, useEffect, useRef, useState } from "react";
import EntireContext from "../../Context/EntireContext";

const ModifyUpLoad = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewUrls, setPreviewUrls] = useState("");
  const [fashionUrl, setFashionUrl] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const fileInputRef = useRef(null);

  const loginUserId = "18c32b4d-8bf9-4bd0-a557-4350ed6717b3";
  console.log("loginUserId", loginUserId);

  const location = useLocation();
  const postId = location.search.substr(8);
  console.log("postId==>", postId);

  //포스터 가져오기
  const getPosts = async (postId) => {
    const { data, error } = await supabase.from("posts").select("*").eq("id", postId);
    if (error) {
      console.error("Error fetching post:", error);
      return null;
    }
    console.log("data", data);
    console.log("data", data[0]);
    const { title, content, img_url, hash_tag } = data[0];
    console.log("title==>", title);
    console.log("content==>", content);
    console.log("img_url==>", img_url);
    console.log("hash_tag==>", hash_tag);

    setTitle(title);
    setContent(content);
    setPreviewUrls(img_url);
    setHashtags(hash_tag);
  };

  console.log("posts===>", posts[0]);
  console.log("title==>", title);
  console.log("content==>", content);
  console.log("img_url==>", previewUrls);
  console.log("hash_tag==>", hashtags);

  // 이미지 프리뷰 함수
  async function handleFilePreviewChange(files) {
    const [file] = files;
    if (!file) {
      return;
    }
    //이미지 미리보기 URL 생성
    // const previewUrl = URL.createObjectURL(file);
    // setPreviewUrls(previewUrl);
    // 스토리지에 업로드
    const filePath = `fashion_${Date.now()}`;
    const { data, error } = await supabase.storage.from("fashions").upload(filePath, file);
    if (error) return;
    setFashionUrl(`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/fashions/${data.path}`);
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setHashtags([...hashtags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeHashTag = (idx) => {
    setHashtags(hashtags.filter((_, i) => i !== idx));
  };

  // 게시글 수정하기
  const updatePost = async () => {
    const { data, error } = await supabase
      .from("posts")
      .update({
        title: title,
        content: content,
        img_url: fashionUrl,
        hash_tag: hashtags
      })
      .eq("id", postId); // postId로 특정 게시물 식별

    if (error) {
      console.error("Error updating post:", error);
      return;
    }
    console.log("Post updated successfully:", data);
    alert("게시물이 성공적으로 수정되었습니다!");
  };

  useEffect(() => {
    getPosts(postId);
  }, []);

  return (
    <>
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
          <Button>업로드</Button>
        </BtnDiv>
        <div>
          <p>해시태그</p>
          <input
            type="text"
            value={hashtags}
            onChange={(e) => {
              const value = e.target.value;
              setInputValue(value.startsWith("#") ? value : "#" + value);
            }}
            onKeyPress={handleKeyPress}
            placeholder="내용을 입력하고 엔터를 누르세요"
          />
          <div>
            {hashtags && hashtags.length > 0 ? (
              hashtags.map((tag, idx) => (
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
              ))
            ) : (
              <p>해시태그가 없습니다</p>
            )}
          </div>
        </div>
      </UpLoadContainer>
    </>
  );
};

export default ModifyUpLoad;

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
