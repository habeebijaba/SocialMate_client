import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Leftbar from '../../Components/Leftbar/Leftbar';
import Rightbar from '../../Components/Rightbar/Rightbar';
import ProfileComponent from '../../Components/ProfileComponent/ProfileComponent';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useSelector } from 'react-redux';




const Profile = () => {
  
  const { id } = useParams();
  const [user, setUser] = useState({});
  const token = useSelector(state => state.token);
  const getUser = async () => {
    try {
      const { data } = await axios.get(`api/user/${id}`, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      })
      setUser(data);
    } catch (err) {
      
    }
  }
  
  useEffect(() => {
    getUser()
  },[id])

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" p={1} spacing={2} >
        <Leftbar profile />
          <ProfileComponent user={user}/>
        <Rightbar />
      </Stack>
   </Box>
  )
}

export default Profile
