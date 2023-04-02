import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { Box, createTheme, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';
import Navbar from '../../Components/Navbar/Navbar';
import Home from '../../Pages/Home/Home';
import Login from '../../Pages/Login/Login';
import Signup from '../../Pages/Signup/Signup';
import Profile from '../../Pages/Profile/Profile';
import Chats from '../../Pages/Chats/Chats';
import Chat from '../../Pages/Chat/Chat';
import Notification from '../../Pages/Notification/Notification';
import VerifyEmail from '../../Pages/VerifyEmail/VerifyEmail';
import Friends from '../../Pages/Friends/Friends';


const User = () => {
    const currentUser = useSelector((state) => Boolean(state.token));
    const mode = useSelector((state) => state.mode);

    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });

   

  

    const Layout = () => {
        return (
            <>
                <ThemeProvider theme={darkTheme}>
                    <Box bgcolor={'background.default'} color={'text.primary'}>
                        <Navbar />
                        <Outlet />
                    </Box>
                </ThemeProvider>
            </>
        );
    };

    const ProtectedRoute = ({ children }) => {
        if (!currentUser) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                }
            >
                <Route path="/" element={<Home />} />
                <Route path="/profile/:id" element={<Profile />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/chat/:id/:friendId" element={<Chat />} />
                <Route path="/notifications" element={<Notification />} />
                <Route path="/friends" element={<Friends />} />
            </Route>
            <Route
                path="/login"
                element={currentUser ? <Navigate to="/" /> : <Login />}
            />
            <Route
                path="/signup"
                element={currentUser ? <Navigate to="/" /> : <Signup />}
            />
            <Route
                path='/verify-eamil/:id'
                element={<VerifyEmail />}
            />
        </Routes>
    );
};

export default User;
