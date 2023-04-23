import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Leftbar from '../../Components/Leftbar/Leftbar';
import Rightbar from '../../Components/Rightbar/Rightbar';
import Livenotification from '../../Components/livenotification/Livenotification';
import React from 'react'

const LiveNotification = () => {
    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" >
                <Leftbar />
                <Livenotification />
                <Rightbar />
            </Stack>
        </Box>
    );
}

export default LiveNotification
