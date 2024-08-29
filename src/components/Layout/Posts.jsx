import React, { useContext, useEffect } from "react";
import supabase from "../../supabaseClient";
import EntireContext from "../../store/Context/EntireContext";

const Posts = () => {
  const ctx = useContext(EntireContext);
  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from("posts").select();

      console.log(data);
    };
    fetchPosts();
  }, []);

  return (
    <>
      Posts
      {}
    </>
  );
};

export default Posts;
