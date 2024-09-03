import { useNavigate, useSearchParams } from "react-router-dom";
import supabase from "../../supabaseClient";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
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

  // 쿼리스트링으로 받아온 id
  // const location = useLocation();
  // const postId = location.search.substr(8);

  const [searchParams, setSearchParams] = useSearchParams();
  const postId = searchParams.get("postId");

  // 해당 게시글 가져오기
  const getPosts = async (postId) => {
    const { data, error } = await supabase.from("posts").select("*").eq("id", postId);
    if (error) {
      console.error("Error fetching post:", error);
      return null;
    }
    setPosts(data);
    return data;
  };

  // 게시글 가져온 후 상태에 저장
  useEffect(() => {
    const fetchData = async () => {
      const fetchedPosts = await getPosts(postId); //?
      if (fetchedPosts && fetchedPosts.length > 0) {
        const post = fetchedPosts[0];
        console.log("post 가져옴 상태에 넣기 전 ==>", post);
        //!SECTION
        setTitle(post.title || "");
        setContent(post.content || "");
        setPreviewUrls(post.img_url || "");
        setHashtags(post.hash_tag || "");
      }
    };
    fetchData();
  }, [postId]); // <-질문하기

  //NOTE - 이미지 프리뷰 & 이미지 스토리지 업로드 함수
  async function handleFilePreviewChange(files) {
    const [file] = files;
    if (!file) {
      return;
    }
    //이미지 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrls(previewUrl);

    //이미지 스토리지에 저장
    const filePath = `fashion_${Date.now()}`;
    const { data, error } = await supabase.storage.from("fashions").upload(filePath, file);
    if (error) return;
    setFashionUrl(`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/fashions/${data.path}`);
  }

  //NOTE - 해시태그 입력하고 엔터누를때 작동하는 함수
  const handleKeyPress = (event) => {
    //엔터키 누름 && 해시태그 값 있을 때
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setHashtags((prevHashtags) => [...prevHashtags, inputValue]);
      setInputValue("");
    }
  };

  //NOTE - 입력한 해시태그 지우는 함수
  const removeHashTag = (idx) => {
    setHashtags(hashtags.filter((_, i) => i !== idx));
  };

  //NOTE - 게시글 수정하는 함수
  const updatePost = async () => {
    console.log("수정버튼클릭");
    console.log("fashionUrl==>", fashionUrl);

    try {
      await supabase
        .from("posts")
        .update({
          title: title,
          content: content,
          img_url: fashionUrl,
          hash_tag: hashtags
        })
        .eq("id", postId); // postId로 특정 게시물 식별
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      toast.success("게시글이 수정되었습니다.");
      setTimeout(function () {
        navigate("/");
      }, 2000);
    }
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
