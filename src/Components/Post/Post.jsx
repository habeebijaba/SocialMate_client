import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Checkbox from '@mui/material/Checkbox';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Article from '@mui/icons-material/Article';
import Comment from '../Comment/Comment';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../utils/axios';
import { setPost } from '../../state/index';
import { Box } from '@mui/system';
import TimeAgo from 'timeago.js';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';


const Post = ({
    postId,
    content,
    author,
    image,
    likes,
    comments,
    createdAt
}) => {
    const dispatch = useDispatch();
    const [commentOpen, setCommentOpen] = useState(false);
    const [comment, setComment] = useState("");
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user?._id);
    const user = useSelector((state) => state.user);
    const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUserId]));
    const likeCount = Object.keys(likes).length;
    const navigate = useNavigate();
    const timeago = new TimeAgo()

    const patchLike = async (e) => {
        setIsLiked(e.target.cheked);
        const response = await axios.patch(`api/posts/${postId}/like`, {loggedInUserId}, {
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json",
        });
        const updatedPost = response.data;
        dispatch(setPost({post: updatedPost}))
    }

    const handleCommentSubmit = async () => {
        try {
            
            const response = await axios.patch(
                `api/posts/${postId}/comment`,
                { loggedInUserId, comment }, {
                headers: { Authorization: `Bearer ${token}` },
                "Content-Type": "application/json",
            });
            const updatedPost = response.data;
            dispatch(setPost({ post: updatedPost }));
            setComment("");
        } catch (error) {
            console.error(error);
        }
    };

        
    return (
        
        <>
            <Card sx={{
                marginTop: 3,
                boxShadow: `-1px 6px 5px 3px rgba(0,0,0,0.25)`
            }} >
                <CardHeader
                    avatar={
                        <Avatar onClick={() => navigate(`/profile/${author?._id}`)} sx={{ bgcolor: "red" }} src={author.profilePic} aria-label="author"/>
                    }
                    action={
                        <IconButton sx={{
                            display: "none",
                            '&:hover': {
                                display:"flex"
                            }
                        }} aria-label="settings">
                            {
                                loggedInUserId === author._id &&
                                <DeleteIcon />
                            }
                        </IconButton>
                    }
                    title= {author.username}
                    subheader={timeago.format(createdAt) }
                />
                <CardMedia
                    component="img"
                    src={image}
                    alt="Paella dish"
                    sx={{ objectFit:"contain", height:"15rem"}}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites" onClick={patchLike}>
                        <Checkbox defaultChecked={isLiked} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: "red" }} />} />
                    </IconButton>
                    <Typography variant="body2" color="text.secondary">
                        {likeCount} Likes
                    </Typography>
                    <IconButton aria-label="comment" onClick={() => setCommentOpen(!commentOpen)}>
                        <Article />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
                {commentOpen &&
                    <Box>
                        <Box sx={{ display: "flex", marginLeft: "1rem" }}>
                            <Avatar src={user.profilePic} sx={{ width: 30, height: 30, marginY: "auto" }} />
                            <TextField id="outlined-basic" onChange={(e) => setComment(e.target.value)} value={comment} placeholder="What's on your mind ?" variant="outlined" sx={{ marginLeft: "1rem", width: "90%", height: "1rem" }} />
                        </Box>
                        <Box sx={{ marginTop: "2rem", marginLeft: "85%", marginBottom: "1rem" }}>
                            <Button variant='contained' size='small' onClick={handleCommentSubmit} >submit</Button>
                        </Box>
                        <Divider />
                        <Box sx={{
                            margin: "1rem",
                            maxHeight: "10rem",
                            overflowY: "scroll",
                            "&::-webkit-scrollbar": {
                                display: "none"
                            }
                        }}>
                        {
                            comments?.map((comment, index) => (
                                <Comment
                                    key={index}
                                    comment={comment}
                                     />
                          ))  
                        }
                        </Box>
                    </Box>}
            </Card>
        </>
    );
}

export default Post
