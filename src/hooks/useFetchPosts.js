import { useCallback, useEffect, useState } from "react";
import { filteredDisplayedPostsData } from "../utils/filteredPostsData";
import { LIMIT_NUMBER } from "../constant/constants";
import getAllData from "../services/getAllDataService";
import formattedLikeData from "../utils/formattedLikeData";
import { useCustomSelector } from "./useSelector";
import { useCustomDispatch } from "./../hooks/useSelector";

const useFetchPosts = () => {
  const userInfo = useCustomSelector((state) => state.userInfo);
  const { setDisplayedPosts, setAllPosts } = useCustomDispatch((dispatch) => dispatch.posts);
  const [loading, setLoading] = useState(false);
  // 유저 정보 확인
  const userId = !!userInfo ? userInfo.id : null;

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getAllData();
      const data = formattedLikeData(response);

      // 전체 게시글 데이터 저장
      setAllPosts(data);

      // 실제 화면에 보여줄 데이터 저장
      setDisplayedPosts(filteredDisplayedPostsData(LIMIT_NUMBER, data));
    } catch (error) {
      console.error("게시글 데이터를 가져오지 못했습니다.", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    loading,
    userInfo
  };
};

export default useFetchPosts;
