import Box from '@mui/material/Box';
import Post from '../Post/Post';
import Stories from '../Stories/Stories';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setPosts } from '../../state';
import axios from '../../utils/axios';
import { getPost } from '../../utils/Constants';
import CircularProgress from '@mui/material/CircularProgress';



const Feed = () => {
  const [skip, setSkip] = useState(0)
  // const [posts, setPosts] = useState([])//fun comment for lazy loading
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
      }

    })
    const postData = response.data;
    dispatch(setPosts({ posts:  postData }));
    console.log(postData.length);
    if (postData?.length === 0) {
      setIsEnd(true)
      return
    }
    setLoading(true)
    setPosts([...posts, ...postData])
    setLoading(false)
  }

  useEffect(() => {
    getPosts()
  }, [])

//for lazy loading...

  // const handleScroll = () => {
  //   if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
  //     setSkip(skip + 10)
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
      {loading &&
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "8vh" }}>
          <CircularProgress />
        </div>}
      {isEnd && <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "8vh" }}>
        <h3>You Almost Reached !!!</h3>
      </div>}
    </Box>

  )
}

export default Feed
