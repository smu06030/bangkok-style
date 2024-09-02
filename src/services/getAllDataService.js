import supabase from "../supabaseClient";

const getAllData = async (userId) => {
  try{
    const selectFields = userId ? "*, likes(user_id)" : "*";
    
    // 전체 게시글 데이터 가져오기
    const response = await supabase
      .from("posts")
      .select(selectFields)
      .order("created_at", { ascending: false });

    return response
  } catch (error) {
    console.error("게시글 데이터를 가져오지 못했습니다.", error);
  }
}

export default getAllData;