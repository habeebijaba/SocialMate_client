import LoadingButton from '@mui/lab/LoadingButton'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSuggestedUsers, setUser } from '../../state';
import axios from '../../utils/axios';
import { addFriend } from '../../utils/Constants';


const NotificationItem = ({ notification }) => {
    
    const currentUser = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const followings = currentUser?.followings;
    const [buttonState, setButtonState] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleFollow = async (friendId) => {
        try {
            if (buttonState) {
                return
            }
            setLoading(true);
            const { data } = await axios.patch(addFriend, { friendId }, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            })

            dispatch(setUser({ user: data.updatedUser }))
            dispatch(setSuggestedUsers({ suggestUsers: data.sugesstions }))
            setLoading(false);
            setButtonState(true)
        } catch (err) {
            console.log(err);
        }
    }
    
  return (
      <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box marginTop="1rem" minWidth="max-content">
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Avatar src={notification?.friend?.profilePic} sx={{ width: 60, height: 60 }} />
                  <Box marginLeft="1rem">
                      <Typography variant="p" fontWeight={600}>
                          {notification?.friend?.username}
                      </Typography>
                      <Typography variant="p" marginLeft="1rem" >
                          {notification?.content}
                      </Typography>
                  </Box>
              </Stack>
          </Box>
          <Box sx={{ marginTop: "1rem" }} >
              {
                notification?.type === "like" &&
                  <img src={notification?.postId?.image} alt='' style={{
                      width: "4rem",
                      height: "4rem",
                      objectFit: "cover"
                  }} /> 
              }
              {
                  notification?.type === "Comment" &&
                  <img src={notification?.postId?.image} alt='' style={{
                      width: "4rem",
                      height: "4rem",
                      objectFit: "cover"
                  }} />
              }
              {
                  notification?.type !== "like" | "Comment" && !followings?.includes(notification?.friend._id)  ? 
                  <LoadingButton
                      size="small"
                      fullWidthonClick={() => handleFollow(notification?.friend._id)}
                      loading={loading}
                      variant="contained"
                  >
                          <span>{buttonState ? 'Following' : "Fowllow back" }</span>
                      </LoadingButton> : ''
              }
          </Box>
      </Stack>
  )
}

export default NotificationItem
