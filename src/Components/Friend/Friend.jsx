import LoadingButton from '@mui/lab/LoadingButton';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import axios from '../../utils/axios';
import { addFriend, unfollow } from '../../utils/Constants';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSuggestedUsers, setUser } from '../../state';
import { setLogout } from '../../state';


const Friend = ({userId, value }) => {
    
    const [loading, setLoading] = useState(false);
    const [friend, setFriend] = useState({});
    const token = useSelector(state => state.token);
    const dispatch = useDispatch();


    const handleFollow = async (friendId) => {
        try {
            setLoading(true);
            const { data } = await axios.patch(addFriend, { friendId }, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            })

            if(data.blocked){
                dispatch(setLogout())
              }else{

            
            dispatch(setUser({ user: data.updatedUser }))
            dispatch(setSuggestedUsers({ suggestUsers: data.sugesstions }))
            setLoading(false)
              }
              
        } catch (err) {
            console.log(err);
        }
    }
    const handleUnfollow = async (friendId) => {
        try {
            setLoading(true)
            const { data } = await axios.patch(unfollow, { friendId }, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            })
            if(data.blocked){
                dispatch(setLogout())
              }else{

            dispatch(setUser({ user: data.updatedUser }))
            dispatch(setSuggestedUsers({ suggestUsers: data.sugesstions }))
            setLoading(false)
              }
        } catch (err) {
            console.log(err);
        }
    }
    const getUser = async () => {
        try {
            const { data } = await axios.get(`api/user/${userId}`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            })
            
            
            setFriend(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUser()
    },[])

  return (
      <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box marginTop="1rem" minWidth="max-content">
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Avatar src={friend?.profilePic} sx={{width:50, height:50}} />
                  <Typography variant='span' margin={1}>
                      {friend?.username}
                  </Typography>
              </Stack>
          </Box>
          <Box sx={{ marginTop: "1rem" }} >
              {
                  value === "followers" ?
                    //   <LoadingButton
                    //       size="small"
                    //       fullWidth
                    //       onClick={()=>handleFollow(friend?._id)}
                    //       loading={loading}
                    //       variant="contained"
                    //   >
                    //       <span>Follow</span>
                    //   </LoadingButton> :
                    <Typography></Typography>:
                      <LoadingButton
                          size="small"
                          fullWidth
                          onClick={()=>handleUnfollow(friend._id)}
                          loading={loading}
                          variant="contained"
                      >
                          <span>Unfollow</span>
                      </LoadingButton>
              }
              
          </Box>
      </Stack>
  )
}

export default Friend
