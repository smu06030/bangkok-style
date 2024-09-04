const formattedLikeData = (response) => {
  return response.data.map(post => ({
    ...post,
    isLiked: post.likes ? post.likes.some(like => typeof like.post_id === 'number') : false
  }))
}

export default formattedLikeData;