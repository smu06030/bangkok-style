import React from "react";
import supabase from "../supabaseClient";

const likeService = async (post_id, user_id, like) => {
  try {
    const { data } = await supabase
      .from("posts")
      .update({ like: !like })
      .eq("id", post_id)
      .eq("user_id", user_id)

  } catch (error) {
    console.error("좋아요 업데이트에 실패했습니다.", error);
  }
};

export default likeService;
