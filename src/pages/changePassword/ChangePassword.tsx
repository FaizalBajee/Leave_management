import React, { FC, useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Divider,
    Button,
    Alert,
    IconButton,
    InputAdornment,
} from "@mui/material";
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

const ChangePassword: FC = () => {

    useEffect(() => {
        console.log(localStorage.getItem("token"))
    }, [])

    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // const [errors, setErrors] = useState<Record<string, string>>({});

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const [message, setMessage] = useState<{ type: "success" | "error" | null; text: string }>({
        type: null,
        text: "",
    });
    // State for form fields
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
    });
    // State for validation errors
    const [errors, setErrors] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    // Validate Fields
    const validateForm = () => {

        let isValid = true;
        let newErrors = { oldPassword: "", newPassword: "", confirmPassword: "" };

        if (!formData.oldPassword.trim()) {
            newErrors.oldPassword = "Old Password is required";
            isValid = false;
        }
        if (!formData.newPassword.trim()) {
            newErrors.newPassword = "New Password is required";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;

    };
    // Handle input change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        // Clear error message when user types
        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };

    // Handle Confirm Password separately
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setConfirmPassword(value);

        // Validate Confirm Password
        if (value !== formData.newPassword) {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "Passwords do not match" }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log(localStorage.getItem("token"));

        if (!validateForm()) {
            setMessage({ type: "error", text: "Please fill in all required fields." });
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setMessage({ type: "error", text: "User is not authenticated." });
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:8111/employee/changePassword",
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();
            console.log(data);

            if (data.success) {
                setMessage({ type: "success", text: data.message });
                setConfirmPassword("");
                setFormData({ oldPassword: "", newPassword: "" });

            } else {
                setMessage({ type: "error", text: data.message || "Failed to change password!" });
            }
        } catch (error) {
            console.error("Error changing password:", error);
            setMessage({ type: "error", text: "Something went wrong. Please try again later." });
        }
    }

    return (
        <div style={{ maxWidth: 1100, margin: "auto" }}>

            <Typography variant="h5" sx={{ mb: 2, textAlign: "left" }}>
                Change Password
            </Typography>

            <Card sx={{ boxShadow: 3, p: 2 }}>
                <CardContent>

                    {message.type === "success" && <Alert severity="success" sx={{ mb: 2 }}>{message.text}</Alert>}
                    {message.type === "error" && <Alert severity="error" sx={{ mb: 2 }}>{message.text}</Alert>}

                    {/* <Divider sx={{ mb: 2 }} /> */}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Old Password"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleChange}
                            error={Boolean(errors.oldPassword)}
                            helperText={errors.oldPassword}
                            fullWidth
                            variant="standard"
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="New Password"
                            type={showPassword ? "text" : "password"}
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            error={Boolean(errors.newPassword)}
                            helperText={errors.newPassword}
                            fullWidth
                            variant="standard"
                            sx={{ mb: 2 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            label="Confirm Password"
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            error={Boolean(errors.confirmPassword)}
                            helperText={errors.confirmPassword}
                            fullWidth
                            variant="standard"
                            sx={{ mb: 2 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                                            {showConfirmPassword ? <VisibilityOffTwoToneIcon /> : <VisibilityTwoToneIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Divider sx={{ my: 2 }} />
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                            <Button variant="contained" color="primary" type="submit"  >
                                Change
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ChangePassword