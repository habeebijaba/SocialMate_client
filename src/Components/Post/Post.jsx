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
import { useState ,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../utils/axios';
import state, { setPost, setUserPost, setUserPosts, setPosts,setNotifications } from '../../state/index';
import { Box } from '@mui/system';
import TimeAgo from 'timeago.js';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import './post.css'
import swal from 'sweetalert2'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Swal from "sweetalert2"
import io from 'socket.io-client';

// const socket = io.connect("wss://heavenslice.ml");
const socket = io.connect("ws://13.49.49.249");


// const socket=io.connect("ws://localhost:6001")




const Post = ({
    postId,
    content,
    author,
    image,
    likes,
    comments,
    createdAt,
}) => {
    const dispatch = useDispatch();
    const [commentOpen, setCommentOpen] = useState(false);
    const [comment, setComment] = useState("");
    const [anchorEl, setAnchorEl] = useState(null)
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user?._id);
    const user = useSelector((state) => state.user);
    const notifications=useSelector((state)=>state.notifications);
    const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUserId]));
    const likeCount = Object.keys(likes).length;
    const navigate = useNavigate();
    const timeago = new TimeAgo()

    const patchLike = async (e) => {
        sendNotification('liked')
        setIsLiked(e.target.cheked);
        const response = await axios.patch(`api/posts/${postId}/like`, { loggedInUserId }, {
            headers: { Authorization: `Bearer ${token}` },
            "Content-Type": "application/json",
        });
        const updatedPost = response.data;
        dispatch(setPost({ post: updatedPost }))
        dispatch(setUserPost({ post: updatedPost }))

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
            dispatch(setUserPost({ post: updatedPost }))

            setComment("");
        } catch (error) {
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'something went wrong !',
            })
            console.error(error);
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const deletePost = async (postId) => {
        setAnchorEl(null);

        try {
            swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((response) => {
                if (response.isConfirmed) {
                    axios.patch(
                        `/api/deletePost/${postId}`, { userId: loggedInUserId },
                        {
                            headers: { Authorization: `Bearer ${token}` },
                            "Content-Type": "application/json",
                        }
                    ).then((response) => {
                        dispatch(setUserPosts({ userPosts: response.data }))
                        swal.fire(
                            'Deleted!',
                            'This post has been deleted.',
                            'success'
                        )
                    }).catch((err) => {
                        Swal.fire(
                            'OOPS!', err,
                            'Some Error.',
                            // 'success'
                        )
                    })
                }
            }
            )
        } catch (err) {
            console.log(err);
        }
    }

    const reportPost = async (postId) => {
        setAnchorEl(null);
        try {
            swal.fire({
                title: "Why are you reporting this post ?",
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off',
                },
                showCancelButton: true,
                confirmButtonText: 'Report',
                showLoaderOnConfirm: true,
                preConfirm: (reason) => {
                    axios.patch(`/api/reportPost/${postId}`,
                        {
                            reason: reason,
                            userId: loggedInUserId
                        },

                        {
                            headers: { Authorization: `Bearer ${token}` },
                            "Content-Type": "application/json",
                        })
                        .then(response => {
                            dispatch(setPosts({ posts: response.data }));
                        })
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((res) => {
                if (res.isDismissed == false) {
                    swal.fire(
                        'Reported!',
                        'This post has been reported.',
                        'success'
                    )
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    const sendNotification=(action)=>{
        console.log("'send notification");
        socket.emit('sendNotification', {
            senderId: loggedInUserId,
            senderName:user.username,
            receiverId: author._id,
            action: action,
            picture:image,
            userpic:user.profilePic
        })
    }

    useEffect(() => {

        socket.on('getNotification', (data) => {
            // console.log(data,"notification");
           let notification=[...notifications,data]
           console.log(notification,"this is from spreading");
        dispatch(setNotifications({notifications:notification}));

        })
    }, [])

    useEffect(() => {
        socket.emit('addUser', loggedInUserId)
        socket.on('getUsers', users => {

        })
    }, [loggedInUserId])
// useEffect(()=>{
//     console.log(notifications,"this is notification from use efect");
// },[notifications])


    return (

        <>
            <Card sx={{
                marginTop: 3,
                boxShadow: `-1px 6px 5px 3px rgba(0,0,0,0.25)`
            }} >
                <Box sx={{ position: 'relative' }}>
                    <CardHeader
                        avatar={
                            <Avatar onClick={() => navigate(`/profile/${author?._id}`)} sx={{ bgcolor: "red", cursor: "pointer" }} src={author.profilePic} aria-label="author" />
                        }
                        action={
                            <IconButton sx={{
                                display: "none",
                                '&:hover': {
                                    display: "flex"
                                }
                            }} aria-label="settings">
                                {
                                    loggedInUserId === author._id &&
                                    <DeleteIcon />
                                }
                            </IconButton>
                        }
                        title={author.username}
                        subheader={timeago.format(createdAt)}

                    />
                    <IconButton aria-label="settings" onClick={handleClick}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,

                        }}>
                        <MoreVertIcon />
                    </IconButton>
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
                        {author._id != user._id ?
                            <MenuItem onClick={() => reportPost(postId)} >Report post</MenuItem>
                            :
                            <MenuItem onClick={() => deletePost(postId)} >Delete post</MenuItem>

                        }
                    </Menu>
                </Box>

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {content}
                    </Typography>
                </CardContent>
                <CardMedia
                    component="img"
                    src={image}
                    alt="Paella dish"
                    sx={{ objectFit: "contain", height: "15rem" }}
                />

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
                    <Typography variant="body2" color="text.secondary">
                        {comments.length} comments
                    </Typography>
                    <IconButton aria-label="share">
                        {/* <ShareIcon /> */}
                    </IconButton>
                </CardActions>
                {commentOpen &&
                    <Box>
                        {/* <Box sx={{ display: "flex", marginLeft: "1rem" }}>
                            <Avatar src={user.profilePic} sx={{ width: 30, height: 30, marginY: "auto" }} />
                            <TextField id="outlined-basic" onChange={(e) => setComment(e.target.value)} value={comment} placeholder="What's on your mind ?" variant="outlined" sx={{ marginLeft: "1rem", width: "90%", height: "1rem" }} />
                        </Box>
                        <Box sx={{ marginTop: "2rem", marginLeft: "85%", marginBottom: "1rem" }}>
                            { comment.length >= 1 ?
                            <Button sx={{borderRadius:"40px"}} variant='contained' size='small' onClick={handleCommentSubmit} >comment</Button>
                            :''}
                        </Box> */}
                        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "10px", marginTop: "10px", marginLeft: "1rem", marginRight: "1rem" }}>
                            <Avatar src={user.profilePic} sx={{ width: 30, height: 30, marginY: "auto" }} />

                            <TextField
                                id="outlined-basic"
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                placeholder="Write a comment..."
                                variant="outlined"
                                sx={{ flex: 1, marginLeft: "10px", borderRadius: "20px", backgroundColor: "#F0F2F5", '& .MuiOutlinedInput-notchedOutline': { borderWidth: 0 } }}

                                InputProps={{ notched: false }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                size="small"
                                onClick={()=>{handleCommentSubmit(); sendNotification('commented on');}}
                                sx={{ marginLeft: "10px", borderRadius: "20px", backgroundColor: "#1877F2", color: "white", cursor: "pointer" }}
                            >
                                Comment
                            </Button>
                        </Box>
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
                                        postId={postId}
                                        index={index}
                                        userId={user._id}
                                        author={author}
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
