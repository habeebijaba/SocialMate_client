import Box from "@mui/material/Box";
import Stack from '@mui/material/Stack';
import ChatBox from "../../Components/ChatBox/ChatBox";
import Leftbar from "../../Components/Leftbar/Leftbar";
import Rightbar from "../../Components/Rightbar/Rightbar";
import React from 'react';

const Chat = () => {
  return (
    <Box>
          <Stack direction="row" justifyContent="space-between" >
              <Leftbar chats />
              <ChatBox />
              <Rightbar />
          </Stack>
    </Box>
  )
}

export default Chat
