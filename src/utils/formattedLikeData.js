const formattedLikeData = (response, userId) => {
  return response.data.map(post => ({
    ...post,
    isLiked: userId ? post.likes.some(like => like.user_id === userId) : false
  }))
}

export default formattedLikeData;