import { Avatar, Box, IconButton, InputBase, Typography } from "@mui/material";
import { Search as SearchIcon, Close } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from '../../utils/axios';

const Search = () => {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);

    const getUsers = async () => {
        try {
            const { data } = await axios.get('api/get-all-user', {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                },
            })
            setUsers(data)
        } catch (err) {
            
        }
    }

    useEffect(() => {
        getUsers();
    },[])
    return (
        <Box>
            <InputBase
                sx={{backgroundColor:"white"}}
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
            />
            <IconButton>
                <SearchIcon />
            </IconButton>
            {search !== "" || open === true ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    position="absolute"
                    backgroundColor="white"
                    marginTop="2rem"
                    borderRadius="10px"
                    width="300px"
                    boxShadow={4}
                    p={1}
                >
                    <IconButton
                        onClick={() => [setOpen(false), setSearch("")]}
                        style={{ alignSelf: "flex-end" }}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                    {users?.length > 0 ? (
                        <Box>
                            {users.map((user1) =>
                                user1.username.toLowerCase().includes(search)  &&
                                    user._id !== user1.id ? (
                                    <Link
                                        key={user1._id}
                                        style={{ textDecoration: "none" }}
                                        to={`/profile/${user1._id}`}
                                    >
                                        <Box
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            p={1} // add some padding
                                            borderRadius="5px"
                                            _hover={{
                                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Avatar
                                                    alt="userImage"
                                                    src={`${user1.profilePic}`}
                                                    sx={{ marginRight: 1 }}
                                                />
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{ color: "black" }}
                                                >
                                                    {user1.username}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Link>
                                ) : null
                            )}
                        </Box>
                    ) : (
                        <Typography>User not found.</Typography>
                    )}
                </Box>
            ) : null}
        </Box>
    );
}

export default Search
