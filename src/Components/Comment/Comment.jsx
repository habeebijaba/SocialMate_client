import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TimeAgo from 'timeago.js';
import { useState } from 'react';
import axios from '../../utils/axios';
import { setPost,setUserPost } from '../../state/index';
import { useSelector, useDispatch } from 'react-redux';


const Comment = ({ comment, postId, index,userId,author }) => {
   
    const [anchorEl, setAnchorEl] = useState(null)  
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async (postId, createdAt) => {
        try {
            const response = await axios.patch(
                'api/deleteComment',
                { postId: postId, createdAt: createdAt },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    "Content-Type": "application/json",
                }
            );
            setAnchorEl(null);
            const updatedPost = response.data;
            dispatch(setPost({ post: updatedPost }));
          dispatch(setUserPost({post: updatedPost}))

        } catch (error) {
            console.error(error);
        }
    };

    const timeago = new TimeAgo()
    return (
        <Box>
            <Card sx={{ marginBottom: "0.5rem" }}>
                <Stack justifyContent="space-between" direction="row" sx={{ margin: "1rem" }}>
                    <Box sx={{ display: "flex" }}>
                        <Avatar src={comment.author.profilePic} sx={{ width: 30, height: 30 }} />
                        <Typography variant='span' sx={{ marginTop: "0.3rem", marginLeft: "1rem" }}>{comment.author.username}</Typography>
                    </Box>
                    <Box>
                        <Typography variant='p'>{timeago.format(comment.createdAt)}</Typography>
                        {/* <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton> */}
                        {/* <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleDelete}
                            sx={{ justifyContent: 'flex-end', paddingRight: '10px' }}>Delete Comment</MenuItem>
                        </Menu> */}
                        {userId==comment.author._id || userId==author._id ?
                        <IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                          : ''}
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            <MenuItem onClick={() => handleDelete(postId, comment.createdAt)}>Delete Comment</MenuItem>
                        </Menu>

                    </Box>
                </Stack>
                <Box sx={{ margin: "1rem" }}>
                    <Typography variant='p'>{comment.text}</Typography>
                </Box>
                <Box>

                </Box>
            </Card>
        </Box>
    )
}

export default Comment
