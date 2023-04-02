import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material';
import Add from '@mui/icons-material/Add';
import React from 'react';
import { useState } from 'react';
import { useDropzone } from "react-dropzone";
import axios from '../../utils/axios';
import { submitPost } from '../../utils/Constants';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from "../../state/index";


const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});

const UserBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px"
});

const AddPost = () => {
    const [open, setOpen] = useState(false);
    const [image, setImgae] = useState(false);
    const [files, setFiles] = useState([]);
    const [postContent, setPostContent] = useState('');
    const [loading, setLoading] = useState(false);
    const token = useSelector((state) => state.token);
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    


    const handleSubmit = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('content', postContent);
        if (files.length > 0) {
            formData.append('image', files[0]);
            formData.append("imagePath", files[0].name);
        }
        const response = await  axios.post(submitPost, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                 'Authorization': `Bearer ${token}`,
            }
        })
        const post = await response.data;
        
        dispatch(setPosts({ posts: [post,...posts] }));
        setLoading(false);
        setOpen(false);
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [], 
        },
        multiple:false,
        onDrop: acceptedFiles => {
            setImgae(false)
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const user = useSelector(state => state.user);


    return (
        <>
            <Tooltip onClick={e => setOpen(true)}
                title="Addpost" sx={{
                    position: "fixed",
                    bottom: 20,
                    left: { xs: "calc(50% - 25px)", md: 30 }
                }}>
                <Fab color="primary" aria-label="add">
                    <Add />
                </Fab>
            </Tooltip>
            <StyledModal
                open={open}
                onClose={e => { setOpen(false); setFiles([])}}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box width={400} height={image || files[0] ? 450 : 280} bgcolor={"background.default"} color={"text.primary"} p={3} borderRadius={5}>
                    <Typography variant="h6" color="gray" textAlign="center">
                        Create Post
                    </Typography>
                    <UserBox>
                        <Avatar
                            src={user?.profilePic}
                            sx={{ width: 30, height: 30 }}
                        />
                        <Typography fontFamily={500} variant="span">{user?.username }</Typography>
                    </UserBox>
                    <TextField
                        sx={{ width: "100%" }}
                        id="standard-multiline-static"
                        multiline
                        rows={3}
                        placeholder="What's on your mind ?"
                        variant="standard"
                        onChange={(e) => setPostContent(e.target.value)}
                    />
                    {
                        !files[0] && 
                        <Box {...getRootProps({ className: 'dropzone' })}
                            sx={{
                                ...(image === false && {
                                    display: "none",
                                }),
                                ...(image === true && {
                                    display: "flex",
                                }),
                            }}
                        >
                            <input {...getInputProps()} />
                            <Box
                                border={"2px dashed "}
                                sx={{
                                    padding: "3rem",
                                    marginTop: "1rem",
                                    textAlign: "center",
                                    "&:hover": { cursor: "pointer" }
                                }}>
                                <p>Add Picture Here</p>
                            </Box>
                        </Box>
                    }
                    
                    {
                        files[0] && 
                        <Box>
                            <img src={files[0]?.preview} alt='' style={{
                                width: "10rem",
                                height: "10rem",
                                objectFit: "cover"
                                }}
                             onLoad={() => { URL.revokeObjectURL(files[0]?.preview) }}    />
                        </Box>
                    }
                    <Stack direction="row" gap={1} mt={2} mb={3}>
                        <ImageIcon onClick={e => setImgae(!image)} color="secondary" />
                    </Stack>
                    <LoadingButton
                        size="small"
                        fullWidth
                        onClick={handleSubmit}
                        loading={loading}
                        variant="contained"
                    >
                        <span>Post</span>
                    </LoadingButton>
                </Box>
            </StyledModal>
        </>
    );
};

export default AddPost
