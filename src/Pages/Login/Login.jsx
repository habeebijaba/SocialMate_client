import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";
import axios from '../../utils/axios';
import { loginPost } from '../../utils/Constants';
import { toast, Toaster } from "react-hot-toast";
import { GoogleLogin } from '@react-oauth/google';



const Login = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });

    const handleSubmit = (values) => {

        setIsSubmitting(true);
        axios
            .post(loginPost, values, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                dispatch(
                    setLogin({
                        user: response.data.user,
                        token: response.data.token,
                    })
                );
                navigate('/');
            })
            .catch((err) => {
                ((error) => {
                    toast.error(error.response.data.msg, {
                        position: "top-center",
                    });
                })(err);
            });
        setIsSubmitting(false);

    };
    const handleGoogleLogin = async (response) => {
        const data = JSON.stringify({ token: response.credential })
        axios.post('api/google-login', data, {
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            dispatch(
                setLogin({
                    user: response.data.user,
                    token: response.data.token,
                })
            );
            navigate('/');
        })
            .catch((err) => {
                console.log(err);
                ((error) => {
                    toast.error(error.response.data.msg, {
                        position: "top-center",
                    });
                })(err);
            });
    }


    return (
        <Grid container sx={{
            height: "100vh",
            backgroundColor: "rgb(193, 190, 255)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Grid item xs={12} md={6}>
                <Card sx={{
                    marginTop: { xs: "6rem", sm: "0" }
                }}>
                    <Stack direction={{ xs: "column", sm: "row" }} >
                        <Box flex={1} sx={{
                            background: `linear-gradient(rgba(39, 11, 96, 0.5), rgba(39, 11, 96, 0.5)),  url(${"https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"}), center`,
                            backgroundSize: "cover",
                            height: "70vh",
                            padding: "3rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: '1.5rem',
                            color: "white"
                        }}>
                            <Typography fontWeight={500} variant='h2' lineHeight={1} >
                                Welcome <br></br> Back.
                            </Typography>
                            <Typography variant='p' >
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </Typography>
                            <Typography variant='span' fontSize={14} >
                                Don't you have an account ?
                            </Typography>
                            <Link to="/signup">
                                <Button sx={{
                                    width: "50%",
                                    backgroundColor: "white",
                                    color: "rebeccapurple",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "white"
                                    }
                                }}
                                    variant="contained">
                                    Register
                                </Button>
                            </Link>
                        </Box>
                        <Box flex={1} sx={{
                            padding: "3rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.5rem",
                            justifyContent: "center"
                        }} >
                            <Typography variant='h4' color="#555" fontWeight="bold" >
                                Login
                            </Typography>
                            <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        <Field
                                            name="email"
                                            as={TextField}
                                            label="Email"
                                            variant="standard"
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                        <Field
                                            name="password"
                                            as={TextField}
                                            variant="standard"
                                            label="Password"
                                            type="password"
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                        />
                                        <Button sx={{
                                            width: "50%",
                                            backgroundColor: "#938eef",
                                            color: "white",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                            marginTop: '1rem',
                                            "&:hover": {
                                                backgroundColor: "rebeccapurple"
                                            }
                                        }}
                                            type="submit"
                                            variant="contained"
                                            disabled={isSubmitting}>
                                            Login
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                            <Toaster />
                            <GoogleLogin
                                onSuccess={response => {
                                    handleGoogleLogin(response)
                                    // fetch("http://localhost:6001/api/google-login", {
                                    //     method: "POST",
                                    //     headers: {
                                    //         "Content-Type": "application/json"
                                    //     },
                                    //     body: JSON.stringify({ token: response.credential })
                                    // })
                                    //     .then(response => response.json())
                                    //     .then(data => console.log(data))
                                    //     .catch(error => console.error(error));
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                useOneTap
                            />
                        </Box>
                    </Stack>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Login
