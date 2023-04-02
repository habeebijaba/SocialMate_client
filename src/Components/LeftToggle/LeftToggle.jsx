import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Home from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import EmailIcon from '@mui/icons-material/Email';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setLogout } from '../../state';

const LeftToggle = ({ state, setState }) => {

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const toggleDrawer = (open) => () => {
        setState(open);
    };
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user?._id);

    const list = () => (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                <ListItem>
                    <ListItemButton onClick={() => navigate(`/profile/${userId}`)}>
                        <ListItemIcon>
                            <Avatar src={user.profilePic} sx={{ width: 30, height: 30 }} />
                        </ListItemIcon>
                        <ListItemText primary={user?.username} />
                    </ListItemButton>
                </ListItem>
                <ListItem>
                    <Link to="/" style={{ textDecoration: 'none', color: "inherit" }}>
                        <ListItemButton >
                            <ListItemIcon>
                                <Home sx={{ color: "blue" }} />
                            </ListItemIcon>
                            <ListItemText primary="Homepage" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/chats" style={{ textDecoration: 'none', color: "inherit" }}>
                        <ListItemButton >
                            <ListItemIcon>
                                <EmailIcon sx={{ color: "rgb(242, 182, 17)" }} />
                            </ListItemIcon>
                            <ListItemText primary="Chats" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/friends" style={{ textDecoration: 'none', color: "inherit" }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <PersonIcon sx={{ color: "rgb(4, 191, 4)" }} />
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
    )
    return (
        <Drawer
            anchor="left"
            open={state}
            onClose={toggleDrawer(false)}
        >
            {list("Left")}
        </Drawer>
  )
}

export default LeftToggle
