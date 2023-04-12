import Box from '@mui/material/Box';
import Post from '../Post/Post';
import Stories from '../Stories/Stories';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPosts } from '../../state';
import axios from '../../utils/axios';
import { getPost } from '../../utils/Constants';
import CircularProgress from '@mui/material/CircularProgress';
import { setLogout } from '../../state';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';


const Feed = () => {
  const [skip, setSkip] = useState(0)
  const userId = useSelector(state => state.user?._id);
  const [isEnd, setIsEnd] = useState(false)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await axios.get(getPost, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
      params: {
        skip: skip,
        userId: userId

      }
    })

    const postData = response.data;
    // const combinedPosts = [...posts, ...postData];

    dispatch(setPosts({ posts: postData }));
    // setSkip(skip + 10);
    if (postData?.length < 10) {
      setLoading(false)
      setIsEnd(true)
      return
    }
  }

  useEffect(() => {
      getPosts()
  }, [])


  //for lazy loading...

  // const handleScroll = () => {
  //   if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
  //     setLoading(true)
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll)
  //   return () => window.removeEventListener("scroll", handleScroll)
  // }, [])

  return (
    <Box flex={4}>
      <Stories />
      {
        posts.map(({
          _id,
          content,
          author,
          image,
          likes,
          comments,
          createdAt
        }) => (
          <Post
            key={_id}
            postId={_id}
            content={content}
            author={author}
            image={image}
            likes={likes}
            comments={comments}
            createdAt={createdAt}
          />
        ))
      }
      {loading && !isEnd &&
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "8vh" }}>
          <LoadingButton
            size="small"
            onClick={() => getPosts()}
            // loading={loading}
            variant="contained"
          >show more</LoadingButton>
        </div>}
      {isEnd && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "8vh" }}>
        <h3>You Almost Reached !!!</h3>
      </div>}
    </Box>

  )
}

export default Feed
