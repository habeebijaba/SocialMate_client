import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import axios from "../../utils/axios";
import ChatItem from "../ChatItem/ChatItem";
import { Divider } from "@mui/material";
import io from "socket.io-client";

const socket = io.connect("ws://13.49.49.249");

// const socket = io.connect("wss://heavenslice.ml");

// const socket=io.connect("ws://localhost:6001")

const ChatList = () => {
  const [converstations, setConverstations] = useState([]);
  const [message, setMessage] = useState([]);

  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const scrollRef = useRef();

  useEffect(() => {
    socket.emit("addUser", userId);
    socket.on("getUsers", (users) => {});
  }, [userId]);
  useEffect(() => {
    socket.on("getMessage", (data) => {
      setMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: new Date(),
      });
    });
  }, []);

  useEffect(() => {
    const getConverstations = async () => {
      try {
        const res = await axios.get(`api/converstation/${userId}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
        setConverstations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConverstations();
  }, [message]);

  return (
    <Box flex={4}>
      <Card
        sx={{
          boxShadow: `-1px 6px 5px 3px rgba(0,0,0,0.25)`,
          height: "90vh",
          width: "98%",
        }}>
        <Box
          sx={{
            textAlign: "center",
          }}>
          <Typography variant="h6" component="h1">
            Chats
          </Typography>
          <Divider />
        </Box>
        <Box>
          {/* <Box>
            <TextField sx={{
              marginInline: "2rem",
              width: "98%",
              backgroundColor: "transparent"
            }} id="standard-basic" placeholder="Find User" variant="standard" />
          </Box> */}
          <Box>
            <List
              dense
              sx={{
                bgcolor: "background.paper",
                maxHeight: "80vh",
                overflowY: "scroll",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}>
              {converstations?.map((chat) => {
                return <ChatItem key={chat._id} chat={chat} />;
              })}
            </List>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default ChatList;
