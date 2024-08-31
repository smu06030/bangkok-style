// 전체 게시글에서 limitNumber 만큼 더 가져오기
export const filteredDisplayedPostsData = (limitNumber, allPosts, displayedPosts = []) => {
  const limit = displayedPosts.length + limitNumber;
  const posts = allPosts.filter((_, index) => index + 1 <= limit);

  return posts;
};