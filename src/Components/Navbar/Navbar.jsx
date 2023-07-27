import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import Mail from "@mui/icons-material/Mail";
import Notification from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import LeftToggle from '../LeftToggle/LeftToggle';
import { setMode, setMessageCount } from '../../state';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLogout } from '../../state';
import Search from '../Search/Search';
import axios from '../../utils/axios';

import io from 'socket.io-client';


const socket = io.connect("ws://13.49.49.249");

// const socket = io.connect("wss://heavenslice.ml");

// const socket=io.connect("ws://localhost:6001")

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "2rem",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "flex"
  }
}));

const MobileIcons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    display: "none"
  }
}));

const Navbar = () => {

  const [open, setOpen] = useState(false);
  const [state, setState] = useState(false);
  const [notification, setNotification] = useState(null)

  // const [messageCount,setMessageCount]=useState(0)

  const toggleDrawer = (open) => () => {
    setState(open);
  };
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const liveNotifications = useSelector((state) => state.notifications);
  const messageCount = useSelector((state) => state.messageCount)

  
    useEffect(() => {

      socket.on('getNotification', (data) => {
          setNotification({
              senderId: data.senderId,
              senderName:data.senderName,
              text: data.text,
              createdAt: new Date()
          })
      })
  }, [socket])

  useEffect(() => {
      socket.emit('addUsers', user._id)
      socket.on('getUserss', users => {

      })
  }, [socket])

 


  useEffect(() => {
    const converstationCount = async () => {
      console.log("callingg");
      
      try {
        const { data } = await axios.get(`api/converstation/converstationCount/${user._id}`)
        dispatch(setMessageCount({ messageCount: data }))
      } catch (err) {
        console.log(err);
      }
    }
    converstationCount()
  }, [messageCount])

  return (
    <AppBar sx={{ backgroundColor: "rgba(39, 11, 96, )" }} position='sticky' >
      <StyledToolbar>
        <Typography variant='h6' sx={{ display: { xs: "none", md: "block" } }}>
          SocialMate
        </Typography>
        <Avatar src='https://res.cloudinary.com/dinc8ztk0/image/upload/v1678868414/icons8-connect-150_2_hofymj.png' sx={{ width: 30, height: 30, display: { xs: "block", md: "none" } }} onClick={toggleDrawer(true)} />
        <LeftToggle state={state} setState={setState} />
        <Search />
        <Typography sx={{ display: { md: "none" } }} >SocialMate</Typography>
        <Icons>
          <DarkModeIcon onClick={() => dispatch(setMode())} color='white' />
          <Link to="/chats" style={{ color: 'white' }}>
            <Badge badgeContent={messageCount} color="error">
              <Mail color="white" />
            </Badge>
          </Link>
          <Link to="/liveNotifications" style={{ color: 'white' }}>
            <Badge badgeContent={liveNotifications.length} color="error">
              <Notification color="white" />

            </Badge>
          </Link>
          {/* <Link to="/notifications" style={{ color: 'white' }}>
            <Badge badgeContent={4} color="error">
              <Notification color="white" />
            </Badge>
          </Link> */}
          <Avatar sx={{ width: 30, height: 30 }} src={user?.profilePic} onClick={e => setOpen(true)} />
        </Icons>
        <MobileIcons>
          <DarkModeIcon onClick={() => dispatch(setMode())} color='white' />
          <Link to="/chats" style={{ color: 'white' }}>
            <Badge badgeContent={messageCount} color="error">
              <Mail color="white" />
            </Badge>
          </Link>
          <Link to="/liveNotifications" style={{ color: 'white' }}>
            <Badge badgeContent={liveNotifications.length} color="error">
              <Notification color="white" />

            </Badge>
          </Link>
          {/* <Link to="/notificatios" style={{ color: 'white' }}>
            <Badge badgeContent={4} color="error">
              <Notification color="white" />
            </Badge>
          </Link> */}
          <Avatar sx={{ width: 30, height: 30 }} src={user?.profilePic} onClick={e => setOpen(true)} />
        </MobileIcons>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={e => setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => dispatch(setLogout())} >Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
