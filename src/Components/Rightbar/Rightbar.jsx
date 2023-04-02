import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material';
import axios from '../../utils/axios';
import { getUserSuggestion, addFriend } from '../../utils/Constants';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setSuggestedUsers, setUser } from '../../state';

const StyledCard = styled(Card)({
  "&::WebkitBoxShadow": `0px 0px 25px -10px rgba(0, 0, 0, 0.38)`,
  "&::MozBoxShadow": `0px 0px 25px -10px rgba(0, 0, 0, 0.38)`,
  boxShadow: `0px 0px 25px -10px rgba(0, 0, 0, 0.38)`,
});


const Rightbar = () => {

  const token = useSelector(state => state.token);
  const suggestions = useSelector(state => state.suggestUsers)
  const dispatch = useDispatch();
  
  const getUsers = async () => {
    try {
      const { data } = await axios.get(getUserSuggestion, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })

      dispatch(setSuggestedUsers({ suggestUsers: data}))
    } catch (err) {
      console.log(err);
    }
  }

  const handleFollow = async (friendId) => {
    try {
      const {data} = await axios.patch(addFriend,{friendId}, {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      })
      dispatch(setUser({ user: data.updatedUser }))
      dispatch(setSuggestedUsers({ suggestUsers: data.sugesstions }))
    } catch (err) {
      console.log(err);
    }
  }

 
  
  useEffect(() => {
    getUsers();
  },[])

  return (
    <Box flex={2}
      sx={{ display: { xs: "none", lg: "block" } }}
    >
      <Box position="fixed">
        <Box>
          <Box>
            <StyledCard sx={{
              paddingInline: "1rem",
              minWidth:"100%"
            }}>
              <Typography margin={"0.5rem"} variant='h6' >
                Suggestion For You
              </Typography>
              <Box margin={"0.5rem"} >
                {
                  suggestions.map((user, i) => (
                    <Stack key={i} direction="row" justifyContent="space-between" alignItems="center">
                      <Box marginTop="1rem" minWidth="max-content">
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <Avatar src={user?.profilePic} />
                          <Typography variant='span' margin={1}>
                            {user.username}
                          </Typography>
                        </Stack>
                      </Box>
                      <Box minWidth="max-content" sx={{marginTop:"1rem"}} >
                        <Button variant="contained" onClick={()=>handleFollow(user._id)} size="small" >Follow</Button>
                      </Box>
                    </Stack>
                  ))
                }
                <Box>
                </Box>
              </Box>
            </StyledCard>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Rightbar
