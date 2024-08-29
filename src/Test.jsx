import { useEffect, useRef, useState } from "react";
import supabase from "./supabaseClient";

function App() {
  const [posts, setPosts] = useState([]);
  const [signIn, setSignIn] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");
  const fileInputRef = useRef(null);

  async function getPosts() {
    const { data } = await supabase.from("posts").select();
    setPosts(data);
  }

  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: "github"
    });
  }

  async function checkSignIn() {
    const session = await supabase.auth.getSession();
    const isSignIn = !!session.data.session;

    setSignIn(isSignIn);
  }

  async function signOut() {
    await supabase.auth.signOut();
    checkSignIn();
  }

  async function createPost() {
    const { data } = await supabase
      .from("posts")
      .insert({
        title: prompt("제목을 입력해주세요."),
        content: prompt("내용을 입력해주세요.")
      })
      .select();

    setPosts((prev) => [...prev, ...data]);
  }

  async function deletePost(id) {
    const { data } = await supabase.from("posts").delete().eq("id", id).select();

    const [deletedPost] = data;
    const filteredList = posts.filter((post) => post.id !== deletedPost.id);

    setPosts(filteredList);
  }

  async function updatePost(id) {
    const { data } = await supabase
      .from("posts")
      .update({
        title: prompt("수정할 제목을 입력해주세요."),
        content: prompt("수정할 내용을 입력해주세요.")
      })
      .eq("id", id)
      .select();

    const [updatedPost] = data;
    const updatedList = posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));

    setPosts(updatedList);
  }

  function checkProfile() {
    const { data } = supabase.storage.from("avatars").getPublicUrl("default-profile.jpg");

    setProfileUrl(data.publicUrl);
  }

  async function handleFileInputChange(files) {
    const [file] = files;

    if (!file) {
      return;
    }

    const { data } = await supabase.storage.from("avatars").upload(`avatar_${Date.now()}.png`, file);

    setProfileUrl(`https://<project>.supabase.co/storage/v1/object/public/avatars/${data.path}`);
  }

  useEffect(() => {
    getPosts();
    checkSignIn();
    checkProfile();
  }, []);

  return (
    <main>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button type="button" onClick={() => deletePost(post.id)}>
              글 삭제
            </button>
            <button type="button" onClick={() => updatePost(post.id)}>
              글 수정
            </button>
          </li>
        ))}
      </ul>

      <section className="flex gap-3">
        {signIn ? (
          <>
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
              src={profileUrl}
              alt="profile"
              onClick={() => fileInputRef.current.click()}
            />
            <SignInBtn text="로그아웃" onClick={signOut} />
          </>
        ) : (
          <SignInBtn text="로그인" onClick={signInWithGithub} />
        )}
        <button type="button" onClick={createPost}>
          글 작성
        </button>
      </section>
    </main>
  );
}

function SignInBtn({ text, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default App;
