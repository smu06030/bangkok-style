import { useCallback, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import EntireContext from "../Context/EntireContext";
import { filteredDisplayedPostsData } from "../utils/filteredDisplayedPostsData";

const useFetchPosts = () => {
  const { displayedPosts, setAllPosts, setDisplayedPosts } = useContext(EntireContext);
  const [loading, setLoading] = useState(false);

  // 한번에 보여주는 게시글 수
  const limitNumber = 10;

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

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      // 전체 게시글 데이터 가져오기
      const { data } = await supabase.from("posts").select().order("created_at", { ascending: false });

      // 전체 게시글 데이터 저장
      setAllPosts(data);

      // 실제 화면에 보여줄 데이터 저장
      setDisplayedPosts(filteredDisplayedPostsData(limitNumber, data));
      console.log(data);
    } catch (error) {
      console.error("게시글 데이터를 가져오지 못했습니다.", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    displayedPosts,
    loading
  };
};

export default useFetchPosts;
