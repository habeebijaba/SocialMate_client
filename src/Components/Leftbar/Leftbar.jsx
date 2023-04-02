import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Home from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import LogoutIcon from '@mui/icons-material/Logout';
import EmailIcon from '@mui/icons-material/Email';
import { setLogout } from '../../state';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

const Leftbar = (active) => {
  console.log(active,"active is here");
  console.log(active.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);



  return (
    <Box flex={1}
      sx={{
        display: { xs: "none", md: "block" },
        paddingRight: "3rem",
      }}
    >
      <Box position='fixed'>
        <List>
          <ListItem sx={active.profile?{backgroundColor:"#ebedf0", borderRadius:"5%" }:{}} >
            <ListItemButton onClick={() => navigate(`/profile/${user?._id}`)} >
              <ListItemIcon>
                <Avatar src={user?.profilePic} sx={{ width: 30, height: 30 }} />
              </ListItemIcon>
              <ListItemText primary={user?.username} />
            </ListItemButton>
          </ListItem>
          <ListItem  sx={active.feed?{backgroundColor:"#ebedf0", borderRadius:"5%" }:{} }>
            <Link to="/" style={{ textDecoration: 'none', color:"inherit" }}>
            <ListItemButton >
              <ListItemIcon>
                <Home sx={{color:"blue"}} />
              </ListItemIcon>
              <ListItemText primary="Feed" />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem   sx={active.chats?{backgroundColor:"#ebedf0", borderRadius:"5%" }:{} }>
            <Link to="/chats" style={{ textDecoration: 'none', color: "inherit" }}>
              <ListItemButton >
                <ListItemIcon>
                  <EmailIcon sx={{ color: "rgb(219, 63, 24)" }} />
                </ListItemIcon>
                <ListItemText primary="Chats" />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem  sx={active.friends?{backgroundColor:"#ebedf0", borderRadius:"5%" }:{} }>
            <Link to="/friends" style={{ textDecoration: 'none', color: "inherit" }}>
            <ListItemButton>
              <ListItemIcon>
                <PersonIcon sx={{ color:"rgb(4, 191, 4)"}}/>
              </ListItemIcon>
              <ListItemText primary="Friends" />
            </ListItemButton>
            </Link>
          </ListItem>
            <ListItem >
            <ListItemButton onClick={() => dispatch(setLogout())}>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "rgb(176, 19, 11)" }} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
        </List>
      </Box>
    </Box>
  );
}

export default Leftbar
