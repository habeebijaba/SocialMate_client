import { Box } from '@mui/material';
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

const ChatItem = ({ chat }) => {
    
    const [user, setUser] = useState(null);
    const currentUser = useSelector((state)=>state.user._id)
    const token = useSelector((state)=>state.token)
    const friendId = chat.members.find(m => m !== currentUser);

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
    },[token])

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
                  <ListItemText primary={user?.username} />
              </ListItemButton>
              </ListItem>
          </Link>
          <Divider />
      </Box>
  )
}

export default ChatItem
