import { useContext, useEffect } from "react";
import supabase from "../supabaseClient";
import EntireContext from "../store/Context/EntireContext";

const useFetchPosts = () => {
  const { posts, setPosts } = useContext(EntireContext);
  const PAGES = 10;

  useEffect(() => {
    fetchPosts();
  }, [PAGES]);

  const fetchPosts = async () => {
    const { data } = await supabase.from("posts").select().limit(PAGES);

    setPosts(data);
    console.log(data);
  };

  return {
    posts
  };
};

export default useFetchPosts;
