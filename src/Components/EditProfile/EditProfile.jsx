import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Modal from "@mui/material/Modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "../../utils/axios";
import { Field, Form, Formik } from "formik";
import { setUser } from "../../state";

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const EditProfile = ({ open, setOpen }) => {

    const dispatch = useDispatch()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const validationSchema = Yup.object().shape({
        phone: Yup.string()
            .matches(/^\d{10}$/, "Invalid phone number")
            .required("Mobile number is required"),
        bio: Yup.string(),
    });

    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);




    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            setIsSubmitting(true);
            const userId = user._id
            const { firstName, lastName, phone, bio } = values;
            const data = { firstName, lastName, phone, bio, userId };

            const response = await axios.put("/api/user/profile", data, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSuccessMessage("Profile updated successfully");
            setIsSubmitting(false);
            setOpen(false)
            console.log(response.data);



            dispatch(setUser({ user: response.data }));
        } catch (error) {
            setErrorMessage("Failed to update profile");
            setIsSubmitting(false);
            setOpen(false)
        }
    };



    const [profileEdit, setProfileEdit] = useState(true);
    return (
        <>
            <StyledModal
                open={open}
                onClose={(e) => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    sx={{
                        height: "80vh",
                        width: { sm: "100vw", md: "50vw" },
                    }}
                    bgcolor={"background.default"}
                    color={"text.primary"}
                    p={3}
                    borderRadius={5}
                >
                    <Stack direction="row" spacing={2}>
                        <Box>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={(e) => setProfileEdit(true)}>
                                        <ListItemText primary="Edit Profile" />
                                    </ListItemButton>
                                </ListItem>
                                <Divider />
                                <ListItem disablePadding>
                                    <ListItemButton onClick={(e) => setProfileEdit(false)}>
                                        <ListItemText primary="Change Password" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </Box>
                        {profileEdit && (
                            <Box
                                flex={1}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.5rem",
                                    justifyContent: "center",
                                }}
                            >
                                <Formik
                                    initialValues={{
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        username: user.username,
                                        email: user.email,
                                        phone: user.phone,
                                        bio: user.bio,
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ errors, touched }) => (
                                        <Form>
                                            <Field
                                                name="username"
                                                as={TextField}
                                                label="User Name"
                                                variant="standard"
                                                error={touched.username && Boolean(errors.username)}
                                                helperText={touched.username && errors.username}
                                                disabled
                                                style={{
                                                    margin: "5px",
                                                }}
                                            />
                                            <Field
                                                name="email"
                                                as={TextField}
                                                label="Email"
                                                variant="standard"
                                                error={touched.email && Boolean(errors.email)}
                                                helperText={touched.email && errors.email}
                                                disabled
                                                style={{
                                                    margin: "5px",
                                                }}
                                            />

                                            <Field
                                                name="bio"
                                                as={TextField}
                                                label="Bio"
                                                variant="standard"
                                                error={touched.bio && Boolean(errors.bio)}
                                                helperText={touched.bio && errors.bio}
                                                style={{
                                                    margin: "5px",
                                                    width: "100%",
                                                }}
                                            />

                                            <Field
                                                name="phone"
                                                as={TextField}
                                                variant="standard"
                                                label="Phone Number"
                                                error={touched.phone && Boolean(errors.phone)}
                                                helperText={touched.phone && errors.phone}
                                                style={{
                                                    margin: "5px",
                                                    width: "100%",
                                                }}
                                            />
                                            <Button
                                                sx={{
                                                    alignItems: "center",
                                                    width: "30%",
                                                    backgroundColor: "black",
                                                    color: "white",
                                                    fontWeight: "bold",
                                                    cursor: "pointer",
                                                    marginTop: "5px",
                                                    marginLeft: "5px",
                                                    "&:hover": {
                                                        backgroundColor: "green",
                                                    },
                                                }}
                                                type="submit"
                                                variant="contained"
                                                disabled={isSubmitting}
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </Box>
                        )}
                        {!profileEdit && (
                            <Box
                                flex={1}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.5rem",
                                    justifyContent: "center",
                                }}
                            >
                                <TextField
                                    id="standard-basic"
                                    label="Password"
                                    variant="standard"
                                />
                                <TextField
                                    id="standard-basic"
                                    label="New password"
                                    variant="standard"
                                />
                                <TextField
                                    id="standard-basic"
                                    label="Confirm new password"
                                    variant="standard"
                                />
                                <Button
                                    sx={{
                                        width: "50%",
                                        backgroundColor: "#938eef",
                                        color: "white",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        "&:hover": {
                                            backgroundColor: "rebeccapurple",
                                        },
                                    }}
                                    variant="contained"
                                >
                                    submit
                                </Button>
                            </Box>
                        )}
                    </Stack>
                </Box>
            </StyledModal>
        </>
    );
};

export default EditProfile;