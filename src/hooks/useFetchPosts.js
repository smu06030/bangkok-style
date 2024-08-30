import { useCallback, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import EntireContext from "../store/Context/EntireContext";

const useFetchPosts = () => {
  const { posts, setPosts } = useContext(EntireContext);
  const [loading, setLoading] = useState(false);
  const PAGES = 10;

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from("posts").select().order("created_at", { ascending: false }).limit(PAGES);
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.error("게시글 데이터를 가져오지 못했습니다.", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();

    // // 실시간 구독
    // const channel = supabase
    //   .channel("posts")
    //   .on("postgres_changes", { event: "UPDATE", schema: "public", table: "posts" }, (payload) => {
    //     console.log(payload)
    //     fetchPosts(); // 데이터가 변경되면 다시 가져오기
    //   })
    //   .subscribe();

    // return () => {
    //   supabase.removeChannel(channel); // 클린업 함수
    // };
  }, []); //fetchPosts

  return {
    posts,
    loading
  };
};

export default useFetchPosts;
