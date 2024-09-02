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
  // console.log("userInfo", userInfo);
  // console.log("userInfo.id", userInfo.id);
  // const loginUserId = userInfo.id

  //임시
  // const loginUserId = "18c32b4d-8bf9-4bd0-a557-4350ed6717b3";

  //쿼리스트링으로 받아온 id
  const location = useLocation();
  const postId = location.search.substr(8);

  //포스터 가져오기
  const getPosts = async (postId) => {
    const { data, error } = await supabase.from("posts").select("*").eq("id", postId);
    if (error) {
      console.error("Error fetching post:", error);
      return null;
    }
    setPosts(data);
    return data;
  };

  // 포스터 가져온 후 담기!
  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await getPosts(postId);
      if (fetchedPosts && fetchedPosts.length > 0) {
        const post = fetchedPosts[0];
        console.log("post 가져옴 상태에 넣기 전 ==>", post);
        setTitle(post.title || "");
        setContent(post.content || "");
        setPreviewUrls(post.img_url || "");
        setHashtags(post.hash_tag || "");
      }
    };
    fetchData();
  }, [postId]); //[]로 했어서 가끔 이상했나..?

  // 이미지 프리뷰 함수
  async function handleFilePreviewChange(files) {
    const [file] = files;
    if (!file) {
      return;
    }
    //이미지 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrls(previewUrl);

    //NOTE - 스토리지에 업로드
    const filePath = `fashion_${Date.now()}`;
    const { data, error } = await supabase.storage.from("fashions").upload(filePath, file);
    if (error) return;
    setFashionUrl(`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/fashions/${data.path}`);
  }

  const handleKeyPress = (event) => {
    console.log("handleKeyPress이후 inputValue ==>", inputValue); //#수정
    console.log("handleKeyPress이후 hashtags ==>", hashtags); //['#테스트', '#테스트']
    if (event.key === "Enter" && inputValue.trim() !== "") {
      // setHashtags([...hashtags, inputValue]);
      console.log("handleKeyPress이후 hashtags ==>", hashtags); //['#테스트', '#테스트'] 인 이유 =>함수(setHashtags, setInputValue 등)가 비동기적으로 작동하기때문에
      setHashtags((prevHashtags) => [...prevHashtags, inputValue]); // 이렇게 수정해야??
      console.log("handleKeyPress  함수형 업데이트 이후 hashtags ==>", hashtags); // 안되넹ㅋ

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
    navigate("/");
  };

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
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value;
              setInputValue(value.startsWith("#") ? value : "#" + value);
            }}
            onKeyPress={handleKeyPress}
            placeholder="내용을 입력하고 엔터를 누르세요"
          />
          <div>
            {hashtags.length > 0 &&
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
              ))}
            {/* ) : (
              <></>
            )} */}
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
