import useFetchPosts from "../../hooks/useFetchPosts";
import PostCard from "./PostCard";
import styled from "styled-components";
import Loading from "../../assets/images/Loading";
import Button from "../UI/Button";
import { filteredDisplayedPostsData, filteredSearchTermData } from "../../utils/filteredPostsData";
import { LIMIT_NUMBER } from "../../constant/constants";
import { useCustomDispatch, useCustomSelector } from "../../hooks/useSelector";

const PostsWrapper = styled.div`
  text-align: center;
`;

const ArticleHeader = styled.h2`
  margin: 2rem 0;
  font-size: 1.5rem;
  text-align: center;
`;

const Article = styled.article`
  /* position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  align-items: center; */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  padding: 0;
`;

const LoadingWrapper = styled.div`
  position: absolute;
  width: auto;
  height: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const NotPost = styled.h3`
  margin: 2rem 0;
`

const Posts = () => {
  const { loading, userInfo } = useFetchPosts();
  const { allPosts, displayedPosts, debounceValue, filteredPosts } = useCustomSelector((state) => state.posts);
  const { setDisplayedPosts } = useCustomDispatch((dispatch) => dispatch.posts);

  // 더보기 클릭
  const handleLoadMore = () => {
    const postDisplay = debounceValue
      ? filteredSearchTermData(LIMIT_NUMBER, filteredPosts, displayedPosts)
      : filteredDisplayedPostsData(LIMIT_NUMBER, allPosts, displayedPosts);

    setDisplayedPosts(postDisplay);
  };

  // 더보기 버튼 활성화 여부
  const showLoadMore = debounceValue
    ? displayedPosts.length < filteredPosts.length
    : displayedPosts.length < allPosts.length;

  // 게시글 없음
  const notPosts = <NotPost>게시글이 없습니다.</NotPost>;

  const postCard = displayedPosts.map((post) => <PostCard key={post.id} post={post} userInfo={userInfo} />);
  const showPosts = displayedPosts.length ? (
    <>
      <Article>{postCard}</Article>
      {showLoadMore ? <Button onClick={handleLoadMore}>더보기</Button> : notPosts}
    </>
  ) : (
    notPosts
  );

  if (loading) {
    return (
      <LoadingWrapper>
        <Loading />
      </LoadingWrapper>
    );
  }

  return (
    <PostsWrapper>
      <ArticleHeader>방콕 스타일</ArticleHeader>
      {showPosts}
    </PostsWrapper>
  );
};

export default Posts;
