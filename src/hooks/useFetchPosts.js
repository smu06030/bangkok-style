import { useContext, useEffect, useState } from "react";
import EntireContext from "../Context/EntireContext";
import { filteredDisplayedPostsData } from "../utils/filteredDisplayedPostsData";
import { LIMIT_NUMBER } from "../constant/constants";
import getAllData from "../services/getAllDataService";
import formattedLikeData from "../utils/formattedLikeData";

const useFetchPosts = () => {
  const { allPosts, displayedPosts, setDisplayedPosts, setAllPosts, userInfo } = useContext(EntireContext);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    fetchPosts();
  }, [userInfo]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // 로그인 유무 확인
      const userId = !!userInfo ? userInfo.id : null;
      const response = await getAllData(userId);
      const data = formattedLikeData(response, userId);

      // 전체 게시글 데이터 저장
      setAllPosts(data);

      // 실제 화면에 보여줄 데이터 저장
      setDisplayedPosts(filteredDisplayedPostsData(LIMIT_NUMBER, data));
    } catch (error) {
      console.error("게시글 데이터를 가져오지 못했습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    allPosts,
    displayedPosts,
    setDisplayedPosts,
    loading,
    userInfo
  };
};

export default useFetchPosts;
