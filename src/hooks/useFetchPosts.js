import { useCallback, useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import EntireContext from "../Context/EntireContext";
import { filteredDisplayedPostsData } from "../utils/filteredDisplayedPostsData";
import { LIMIT_NUMBER } from "../constant/constants";

const useFetchPosts = () => {
  const { allPosts, displayedPosts, setDisplayedPosts, setAllPosts, userInfo } = useContext(EntireContext);
  const [loading, setLoading] = useState(false);

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
    try {
      // 전체 게시글 데이터 가져오기
      setLoading(true);
      const { data } = await supabase.from("posts").select().order("created_at", { ascending: false });

      // 전체 게시글 데이터 저장
      setAllPosts(data);

      // 실제 화면에 보여줄 데이터 저장
      setDisplayedPosts(filteredDisplayedPostsData(LIMIT_NUMBER, data));
      console.log(data);
    } catch (error) {
      console.error("게시글 데이터를 가져오지 못했습니다.", error);
    } finally {
      setLoading(false);
    }
  }, [allPosts]);

  return {
    allPosts,
    displayedPosts,
    setDisplayedPosts,
    loading,
    userInfo
  };
};

export default useFetchPosts;
