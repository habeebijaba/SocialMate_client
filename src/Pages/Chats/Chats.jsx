import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Leftbar from '../../Components/Leftbar/Leftbar';
import Rightbar from '../../Components/Rightbar/Rightbar';
import ChatList from '../../Components/ChatList/ChatList';


const Chats = () => {
 

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" >
        <Leftbar chats />
        <ChatList />
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default Chats
