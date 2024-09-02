import React from "react";
import supabase from "../supabaseClient";

const updateLikeStatus = async (post_id, user_id, isLike) => {
  try {
    if (!isLike) {
      const { data } = await supabase.from("likes").insert({ post_id: post_id, user_id: user_id });
    } else {
      const { data, error } = await supabase.from("likes").delete().eq("post_id", post_id).eq("user_id", user_id);

      if (error) throw error;
    }
  } catch (error) {
    console.error("좋아요 업데이트에 실패했습니다.", error);
  }
};

export default updateLikeStatus;