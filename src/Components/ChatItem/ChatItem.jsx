import { Box, Typography, Badge } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from "@mui/material/Divider";
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const ChatItem = ({ chat }) => {

    const [user, setUser] = useState(null);
    const currentUser = useSelector((state) => state.user._id)
    const token = useSelector((state) => state.token)
    const friendId = chat.members.find(m => m !== currentUser);
    const time = new Date(chat.lastMessageData.time)
    const userId = useSelector((state) => state.user._id);

    useEffect(() => {
        const getUser = async () => {
            try {

                const res = await axios.get(`api/user/${friendId}`, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`,
                    },

                })

                setUser(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        getUser();
    }, [token])

    return (
        <Box >
            <Link to={`/chat/${chat._id}/${friendId}`} style={{ textDecoration: 'none', color: "inherit" }}>
                <ListItem>
                    <ListItemButton>
                        <ListItemAvatar>
                            <Avatar
                                alt={`Avatar `}
                                src={user?.profilePic}
                            />
                        </ListItemAvatar>
                        {/* <ListItemText primary={user?.username} />
                  <Typography>message</Typography> */}
                        <Grid container direction="column">
                            <Grid item>
                                {/* <ListItemText primary={user?.username} /> */}
                                <ListItemText primary={<Typography variant="h6" style={{ fontSize: "16px" }}>{user?.username}</Typography>} />

                            </Grid>
                            <Grid item display="flex" >
                                {chat.lastMessageData.sender == userId && chat.unreadCountof == 0 ?
                                    <DoneAllIcon style={{ color: 'blue' }} />
                                    :
                                    ''
                                }
                                {chat.lastMessageData.sender == userId && chat.unreadCountof != 0 ?
                                    <DoneAllIcon style={{ color: 'grey' }} />
                                    :
                                    ''
                                }

                                <Typography variant="body2" style={{ fontSize: "14px", marginLeft: "0.5rem" }}>{chat.lastMessageData.text}</Typography>

                            </Grid>
                        </Grid>
                        <Grid item container direction="column" justifyContent="flex-end" alignItems="flex-end" paddingLeft="28rem">
                            <Typography style={{ fontSize: "12px" }}>
                                {time.toLocaleTimeString([], { hour: 'numeric', minute: 'numeric' })}
                            </Typography>
                            <Badge sx={{ margin: "1rem" }} badgeContent={chat.unreadCount} color="success" />

                        </Grid>
                    </ListItemButton>
                </ListItem>
            </Link>
            <Divider />
        </Box>
    )
}

export default ChatItem
