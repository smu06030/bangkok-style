import { useLocation, useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import { useEffect, useRef, useState } from "react";
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

const ModifyUpLoad = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [previewUrls, setPreviewUrls] = useState("");
  const [fashionUrl, setFashionUrl] = useState("");

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  // const { userInfo } = useContext(EntireContext);
  // const loginUserId = userInfo.id;

  //임시
  const loginUserId = "18c32b4d-8bf9-4bd0-a557-4350ed6717b3";
  console.log("loginUserId", loginUserId);

  //쿼리스트링으로 받아온 id
  const location = useLocation();
  // console.log("location", location.search);
  const postId = location.search.substr(2);
  console.log("postId==>", postId);

  //포스터 가져오기
  const getPosts = async (postId) => {
    const { data, error } = await supabase.from("posts").select("*").eq("id", postId);
    if (error) {
      console.error("Error fetching post:", error);
      return null;
    }
    const { title, content, img_url, hash_tag } = data[0];

    console.log("posts1===>", posts[0]);
    console.log("title1==>", title);
    console.log("content1==>", content);
    console.log("img_url1==>", previewUrls);
    console.log("hash_tag1==>", hashtags);

    setPreviewUrls(img_url || "");
    setTitle(title || "");
    setContent(content || "");
    setHashtags(hash_tag || []);
  };

  console.log("posts2===>", posts[0]);
  console.log("title2==>", title);
  console.log("content2==>", content);
  console.log("img_url2==>", previewUrls);
  console.log("hash_tag2==>", hashtags);

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
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
        <BtnDiv>
          <Button onClick={updatePost}>수정</Button>
          {/* <Button>업로드</Button> */}
        </BtnDiv>
      </UpLoadContainer>
    </>
  );
};

export default ModifyUpLoad;

// const UpLoadContainer = styled.div`
//   border: 1px solid gray;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   margin-top: 50px;
// `;

// const ImagesDiv = styled.div`
//   border: 1px solid gray;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
// `;

// const Img = styled.img`
//   margin: 10px;
//   height: 200px;
//   width: 200px;
// `;
// const InputDiv = styled.div`
//   border: 1px solid gray;
// `;
// const InputTitle = styled.input``;

// const InputTextarea = styled.textarea`
//   width: 100%;
// `;

// const BtnDiv = styled.div`
//   border: 1px solid gray;
// `;

// const Button = styled.button``;
