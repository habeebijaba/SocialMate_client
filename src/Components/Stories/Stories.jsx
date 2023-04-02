import StoryView from '../StoryView/StoryView';
import { useEffect, useState } from 'react';
import AddStory from '../AddStory/AddStory';
import { getUserStory, getFriendsStories } from '../../utils/Constants';
import axios from '../../utils/axios';
import {  useSelector } from 'react-redux';
import TimeAgo from 'timeago.js';
import { Avatar,  Box,  Stack, Typography } from '@mui/material';



const Stories = () => {

    const [openStory, setOpenSory] = useState(false);
    const user = useSelector(state => state.user);
    const [stories, setStories] = useState([]);
    const [userStories, setUserStories] = useState([]);
    const [friends, setFriends] = useState([]);
    const [friendSroty, setFrindStories] = useState([]);
    const token = useSelector(state => state.token);
    const timeago = new TimeAgo()
    const getUserStories = async () => {
        const response = await axios.get(getUserStory, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        })
        const storyData = response.data;
        
        const updated = storyData.map((story) => (
            {
                url: story.file,
                type:story?.fileType,
                header: {
                    heading: story.author.username,
                    subheading: timeago.format(story.createdAt),
                    profileImage: story.author.profilePic,
                },
            }
        ))
        setUserStories(updated)
        // dispatch(setUserStories({ userStories: updated }));
    }
    
    const getFriends = async () => {
        const {data} = await axios.get(getFriendsStories, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
        })
        
        const formated = data.map(({ author, stories }) => stories.map((story) => ({
            url: story.file,
            type: story?.fileType,
            header: {
                heading: author.username,
                subheading: timeago.format(story.createdAt),
                profileImage: author?.profilePic,
            },
        })))
        setFrindStories(formated)
        setFriends(data);

    }
    
    const handleFriendClick = (i) => {
        setStories(friendSroty[i])
        setOpenSory(true);
    }

    const handleUserClick = (i) => {
        setStories(userStories)
        setOpenSory(true);
    }

    useEffect(() => {
        getUserStories()
        getFriends()
    },[])

    
    
    return (
        <>
            <Box sx={{
                maxWidth: { xs: "90vw", sm: "90vw", md: "70vw", lg: "50vw", xl: "60vw" }, overflowX: 'scroll', "&::-webkit-scrollbar": {
                    display: "none"
                } }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{position:"relative", marginBottom:"1rem"}}>
                        <Avatar
                            onClick={() => handleUserClick()}
                            src={user?.profilePic}
                            sx={{ width: 70, height: 70, }} />
                        <AddStory />
                    </Box>
                    {friends.map(({ author }, i) => (
                        <Box key={i} sx={{textAlign:"center"}}>
                        <Avatar
                                onClick={() => handleFriendClick(i)}
                            sx={{ width: 70, height: 70, }}  src={author.profilePic} alt={author.username} />
                         <Typography
                                component='p'
                                fontSize={12}
                            >
                            {
                                    author.username.length > 4 ?
                                        `${author.username.substring(0, 4)}...` :
                                        author.username
                            }
                            </Typography>
                        </Box>    
                    ))}
                </Stack>
            </Box>
            <StoryView open={openStory} setOpen={setOpenSory} story={stories} />
        </>
           
  
    );
}

export default Stories