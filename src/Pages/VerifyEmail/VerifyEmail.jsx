import { Button, Card, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setLogin } from "../../state";
import axios from '../../utils/axios';


const VerifyEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [OTP, setOTP] = useState("");
    const { id } = useParams();

    const handleOTP = async (e) => {
        try {
            e.preventDefault();
            const { data } = await axios.post(`api/verify-email/${id}`, { OTP }, {
                headers: { "Content-Type": "application/json" },
            })
            if (data) {
                dispatch(
                    setLogin({
                        token: data.token,
                        user: data.user
                    })
                );
                navigate("/");
            }
        } catch (err) {
            (({ response }) => {
                toast.error(response.data.message, {
                    position: "bottom-center",
                });
            })(err);
        }
    };

    return (
        <form>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop:"20vh"
            }}>
                <Card sx={{
                    boxShadow: `-1px 6px 5px 3px rgba(0,0,0,0.25)`,
                    height: "50vh",
                    width: { xs: "100vw", md: "50vw" },
                    display: "flex",
                    flexDirection:"column",
                    alignItems: "center",
                    justifyContent: "center"

                }} >

                    <TextField
                        name="otp"
                        label="OTP"
                        // value={email}
                        onChange={(e) => setOTP(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        type="number"
                        fullWidth
                    />
                    <Box sx={{display:"flex", textAlign:"end"}}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOTP}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Box>
                    <Link to="/">
                        <Typography
                            sx={{
                                textAlign: "left",
                                textDecoration: "underline",
                                "&:hover": {
                                    cursor: "pointer",
                                },
                            }}
                        >
                            Back to the page
                        </Typography>
                    </Link>
                </Card>

            </Box>
            
            <Toaster />
        </form>
    );
};

export default VerifyEmail;