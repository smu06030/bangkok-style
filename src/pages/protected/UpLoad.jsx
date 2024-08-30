import styled from "styled-components";
import supabase from "../../supabaseClient";
import { useContext, useEffect, useRef, useState } from "react";
import EntireContext from "../../store/Context/EntireContext";
import { useNavigate } from "react-router-dom";

const UpLoad = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //const [hashtag, setHashtag] = useState([]);
  const [previewUrls, setPreviewUrls] = useState(""); // 이미지 프리뷰 상태 추가
  const [fashionUrl, setFashionUrl] = useState("");

  const fileInputRef = useRef(null);

  const { isSignIn } = useContext(EntireContext);
  console.log("isSignIn", isSignIn);

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
        user_id: "",
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

    // 이미지 여러개 등록일 경우
    // if (!files || files.length === 0) {
    //   return;
    // }
    // const newPreviewUrls = [];
    // for (const file of files) {
    //   const previewUrl = URL.createObjectURL(file);
    //   newPreviewUrls.push(previewUrl);
    // }
    // console.log("newPreviewUrls", newPreviewUrls);
    // setPreviewUrls(newPreviewUrls);

    //이미지 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrls(previewUrl);
    setFashionUrl(previewUrl);
  }
  console.log("fashionUrl=>", fashionUrl);

  //
  // 업로드 버튼
  const createPost = async (e) => {
    // const [file] = files;
    // if (!file) {
    //   return;
    // }
    // const filePath = `fashion_${Date.now()}`;
    // const { data, error } = await supabase.storage.from("fashions").upload(filePath, file);
    // if (error) return;
    // setFashionUrl(`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/fashions/${data.path}`);

    e.preventDefault();
    await supabase.from("posts").insert([
      {
        create_at: Date.now(),
        title,
        content,
        hashtag: ["#멋쟁이", "#데일리"],
        fashionUrl
        // user_id: user_id
      }
    ]);

    // 업로드되면 알림뜨고 리다이렉트
  };

  // 게시글 생성하기
  // async function createPost() {
  //   const { data } = await supabase
  //     .from("posts")
  //     .insert({
  //       // id: "1", // 쿼리스트링으로 가져온 아이디값
  //       created_at: Date.now(),
  //       title: prompt("제목을 입력해주세요."), //input 값
  //       content: prompt("내용을 입력해주세요.") //input 값
  //       // user_id: "user_id",
  //       // hash_tag: "hash_tag",
  //       // img_url: "img_url" // 업로드 된 이미지url 넘길 예정
  //     })
  //     .select();
  //   setPosts((prev) => [...prev, ...data]);
  // }

  //
  // 최초 랜더링 시 호출
  useEffect(() => {
    checkFashion();
    // getPosts();
  }, []);

  return (
    <>
      {isSignIn ? (
        <div>
          <UpLoadContainer>
            <ImagesDiv>
              <input
                onChange={(e) => handleFilePreviewChange(e.target.files)}
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
              />
              <img
                className="rounded-full cursor-pointer w-[45px] h-[45px]"
                width={45}
                height={45}
                src={previewUrls}
                alt="myFashion"
                onClick={() => fileInputRef.current.click()}
              />
            </ImagesDiv>
            <InputDiv>
              <input
                type="text"
                placeholder="제목을 입력해주세요."
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <textarea
                placeholder="내용을 입력해주세요."
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </InputDiv>
            <ButtonDiv>
              <Button onClick={updatePost}>수정</Button>
              <Button onClick={createPost}>업로드</Button>
            </ButtonDiv>
            <div>태그영역</div>
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
