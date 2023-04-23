import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import axios from '../../utils/axios';
import React, { useEffect, useState } from 'react';
import LiveNotificationItem from "../LiveNotificationItem/LiveNotificationItem";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider } from "@mui/material";
import {setNotifications} from '../../state/index'

const Livenotification = () => {
    const dispatch=useDispatch()

    const token = useSelector(state => state.token);
    const liveNotifications=useSelector((state)=>state.notifications);
    
    const clearNotification=()=>{
        dispatch(setNotifications({notifications:[]}))
    }



    return (
        <Box flex={4}>
            <Card sx={{
                boxShadow: `-1px 6px 5px 3px rgba(0,0,0,0.25)`,
                height: "90vh",
                width: "98%"
            }} >
                <Box sx={{
                    textAlign: "center"
                }}>
                    <Typography sx={{marginTop:"1rem"}} variant="h6" component="h1" >
                        Notifications
                    </Typography>
                </Box>
                <Box>
                    <Box>
                    {liveNotifications.length >=1 ?
                        <Button onClick={clearNotification} sx={{display:"flex" ,marginLeft:"auto",backgroundColor:"green",color:"white"}}>clear notifications</Button>
                        :''
                    }

                    </Box>
                    <Box >
                        <Box sx={{
                            width: "90%", margin: "1rem", maxHeight: "80vh",
                            overflowY: "scroll",
                            "&::-webkit-scrollbar": {
                                display: "none"
                            }
                        }}>
                            {liveNotifications.map((item,i) => {
                                return (
                                    <>
                                        <LiveNotificationItem notification={item} />
                                        <Divider/>
                                    </>
                                );
                            })}
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}

export default Livenotification
