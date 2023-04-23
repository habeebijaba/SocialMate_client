import LoadingButton from '@mui/lab/LoadingButton'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSuggestedUsers, setUser } from '../../state';
import axios from '../../utils/axios';
import { addFriend } from '../../utils/Constants';


const LiveNotificationItem = ({notification }) => {
    
    const currentUser = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const followings = currentUser?.followings;
    const [buttonState, setButtonState] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    
    
  return (
      <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box marginTop="1rem" minWidth="max-content">
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Avatar src={notification?.userpic} sx={{ width: 60, height: 60 }} />
                  <Box marginLeft="1rem">
                      <Typography variant="p" fontWeight={600}>
                          {notification?.senderName}
                      </Typography>
                      <Typography variant="p" marginLeft="1rem" >
                          {notification?.action}
                      </Typography>
                      <Typography variant="p" marginLeft="1rem" >
                        your post
                      </Typography>
                  </Box>
              </Stack>
          </Box>
          <Box sx={{ marginTop: "1rem" }} >
              {
                
                  <img src={notification?.picture} alt='' style={{
                      width: "4rem",
                      height: "4rem",
                      objectFit: "cover"
                  }} /> 
              }
              {/* {
                  notification?.type === "Comment" &&
                  <img src={notification?.postId?.image} alt='' style={{
                      width: "4rem",
                      height: "4rem",
                      objectFit: "cover"
                  }} />
              } */}
              {/* {
                  notification?.type !== "like" | "Comment" && !followings?.includes(notification?.friend._id)  ? 
                  <LoadingButton
                      size="small"
                      onClick={() => handleFollow(notification?.friend._id)}
                      loading={loading}
                      variant="contained"
                  >
                          <span>{buttonState ? 'Following' : "Follow back" }</span>
                      </LoadingButton> : ''
              } */}
          </Box>
      </Stack>
  )
}

export default LiveNotificationItem
