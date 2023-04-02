import { Box, Stack } from '@mui/material'
import React from 'react'
import FirendList from '../../Components/FriendList/FirendList'
import Leftbar from '../../Components/Leftbar/Leftbar'
import Rightbar from '../../Components/Rightbar/Rightbar'

const Friends = () => {
  return (
      <Box>
          <Stack direction="row" justifyContent="space-between" >
              <Leftbar friends />
              <FirendList />
              <Rightbar />
          </Stack>
      </Box>
  )
}

export default Friends
