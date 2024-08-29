import styled from "styled-components";
import supabase from "../../supabaseClient";
import { useEffect, useRef, useState } from "react";

const UpLoad = () => {
  const [posts, setPosts] = useState([]);
  const [fashionUrl, setFashionUrl] = useState("");
  const fileInputRef = useRef(null);

  //=========================================================
  // 메인페이지 +버튼 클릭 시
  // 메인페이지 -> 업로드페이지(작성되지 않은 상태 업로드가능)
  // 마이페이지 게시글 클릭 시
  // 마이페이지 -> 업로드페이지(작성된 상태 수정가능)
  //=========================================================

  //
  //
  // 게시글 가져오기
  async function getPosts() {
    const { data } = await supabase.from("posts").select();
    console.log(data);

    setPosts(data);
  }

  //
  //
  // 게시글 생성하기
  async function createPost() {
    const { data } = await supabase
      .from("posts")
      .insert({
        // id: "1",
        // created_at: Date.now(),
        title: prompt("제목을 입력해주세요."),
        content: prompt("내용을 입력해주세요.")
        // user_id: "user_id",
        // hash_tag: "hash_tag",
        // img_url: "img_url" // 업로드 된 이미지url 넘길 예정
      })
      .select();

    console.log(data);

    //setPosts((prev) => [...prev, ...data]);
  }

  //
  //
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
        hash_tag: "",
        img_url: prompt("수정할 이미지")
      })
      .eq("id", id)
      .select();

    const [updatedPost] = data;
    const updatedList = posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));

    setPosts(updatedList);
  }

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
    setFashionUrl(`https://bangkok-style.supabase.co/storage/v1/object/public/fashions/${data.path}`);
  }
  console.log("fashionUrl :", fashionUrl);

  //
  //
  // 맨 처음 랜더링 시 checkFashion() 호출
  useEffect(() => {
    checkFashion();
    getPosts();
  }, []);

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
          <Button onClick={updatePost}>수정</Button>
          <Button onClick={createPost}>업로드</Button>
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
