import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Leftbar from '../../Components/Leftbar/Leftbar';
import Rightbar from '../../Components/Rightbar/Rightbar';
import Notifications from '../../Components/Notifications/Notifications';
import React from 'react'

const Notification = () => {
    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" >
                <Leftbar />
                <Notifications />
                <Rightbar />
            </Stack>
        </Box>
    );
}

export default Notification
