import Box from '@mui/material/Box';
import Stories from 'react-insta-stories';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper";
import { forwardRef} from 'react';
// Import Swiper styles

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import AddStory from '../AddStory/AddStory';





const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const StoryView = ({ open, setOpen, story }) => {


    
    const handleClose = () => {
        setOpen(false);
    };

   

    return (
        <Box>

            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {
                        !story[0] ? <AddStory /> :
                            <Swiper
                                effect={"coverflow"}
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={"auto"}
                                pagination={true}
                                navigation={true}
                                modules={[EffectCoverflow, Pagination, Navigation]}
                                className="mySwiper">

                                <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>

                                    <Stories
                                        stories={story}
                                        defaultInterval={1500}
                                        loop={true}
                                    />
                                </SwiperSlide>

                            </Swiper>
                   }
                </Box>
            </Dialog>
        </Box>
    )
}

export default StoryView
