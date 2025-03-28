import React, { FC, useEffect, useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Divider, Alert, MenuItem, IconButton, InputAdornment } from "@mui/material";

interface department {
    id: number;
    deptCode: string;
    deptName: string;
    deptSN: string;
    createdAt: string;
}

const ManageEmployee: FC = () => {

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:8111/department/getDepartment", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                // const data = await response.json();
                // console.log(data.content.department)
                if (!response.ok) {
                    throw new Error("Failed to fetch departments");
                }

                const data = await response.json();
                console.log(data.content.department)
                setDepartments(data.content.department || []);

            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    const [formData, setFormData] = useState({
        empCode: "",
        fName: "",
        lName: "",
        password: "",
        // confirmPassword: "",
        gender: "",
        email: "",
        dob: "",
        dept: "",
        phone: "",
        address: "",
        city: "",
        country: "",
    });

    const [departments, setDepartments] = useState<department[]>([])

    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [message, setMessage] = useState({ type: "", text: "" });

    // Handle Input Change (except Confirm Password)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        // Validate Password if Confirm Password is entered
        if (name === "password" && confirmPassword && value !== confirmPassword) {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "Passwords do not match" }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
        }
    };

    // Handle Confirm Password separately
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setConfirmPassword(value);

        // Validate Confirm Password
        if (value !== formData.password) {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "Passwords do not match" }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
        }
    };

    // Validate Fields
    const validateForm = () => {
        let newErrors: Record<string, string> = {}; // Explicitly define the object type

        if (!formData.empCode) newErrors["empCode"] = "Employee Code is required";
        if (!formData.fName) newErrors["fName"] = "First Name is required";
        if (!formData.lName) newErrors["lName"] = "Last Name is required";
        if (!formData.gender) newErrors["gender"] = "gender is required";
        if (!formData.password) newErrors["password"] = "Password is required";
        if (!formData.email) newErrors["email"] = "Email is required";
        if (!formData.dob) newErrors["dob"] = "Date of Birth is required";
        if (!formData.dept) newErrors["dept"] = "Department is required";
        if (!formData.phone) newErrors["phone"] = "Phone number is required";
        if (!formData.address) newErrors["address"] = "address is required";
        if (!formData.city) newErrors["city"] = "City is required";
        if (!formData.country) newErrors["country"] = "Country is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle Form Submission
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!validateForm()) {
            setMessage({ type: "error", text: "Please correct the errors." });
            return;
        }
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(
                "http://localhost:8111/employee/addEmployee",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();
            console.log(data)

            if (data.success) {

                setMessage({ type: "success", text: data.message });
                setFormData({
                    empCode: "",
                    fName: "",
                    lName: "",
                    password: "",
                    gender: "",
                    email: "",
                    dob: "",
                    dept: "",
                    phone: "",
                    address: "",
                    city: "",
                    country: ""
                });
                setConfirmPassword("");

            } else {
                setMessage({ type: "error", text: data.message || "Failed to add Employee!" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong!.." });
        }

        console.log(formData)
    };


    return (
        <div style={{ maxWidth: 1100, margin: "auto" }}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: "left" }}>
                Add Employee
            </Typography>

            <Card sx={{ boxShadow: 3, p: 2 }}>
                <CardContent>
                    {message.type === "success" && <Alert severity="success" sx={{ mb: 2 }}>{message.text}</Alert>}
                    {message.type === "error" && <Alert severity="error" sx={{ mb: 2 }}>{message.text}</Alert>}

                    {/* <Divider sx={{ mb: 2 }} /> */}

                    <form onSubmit={handleSubmit}>
                        <TextField label="Employee Code" name="empCode" value={formData.empCode} onChange={handleChange} error={Boolean(errors.empCode)} helperText={errors.empCode} fullWidth variant="standard" sx={{ mb: 2 }} />
                        <TextField label="First Name" name="fName" value={formData.fName} onChange={handleChange} error={Boolean(errors.fName)} helperText={errors.fName} fullWidth variant="standard" sx={{ mb: 2 }} />
                        <TextField label="Last Name" name="lName" value={formData.lName} onChange={handleChange} error={Boolean(errors.lName)} helperText={errors.lName} fullWidth variant="standard" sx={{ mb: 2 }} />

                        <TextField
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                            fullWidth
                            variant="standard"
                            sx={{ mb: 2 }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? "🔒" : "👁️"}
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
                                            {showConfirmPassword ? "🔒" : "👁️"}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField label="Gender" name="gender" select value={formData.gender} onChange={handleChange} error={Boolean(errors.gender)} helperText={errors.gender} fullWidth variant="standard" sx={{ mb: 2 }}>
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>

                        <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={Boolean(errors.email)} helperText={errors.email} fullWidth variant="standard" sx={{ mb: 2 }} />
                        <TextField label="Date of Birth" name="dob" type="date" InputLabelProps={{ shrink: true }} value={formData.dob} onChange={handleChange} error={Boolean(errors.dob)} helperText={errors.dob} fullWidth variant="standard" sx={{ mb: 2 }} />

                        <TextField label="Department" name="dept" select value={formData.dept} onChange={handleChange} error={Boolean(errors.dept)} helperText={errors.dept} fullWidth variant="standard" sx={{ mb: 2 }} >
                            {departments.map((dept) => (
                                <MenuItem key={dept.id} value={dept.deptName}>{dept.deptName}</MenuItem>
                            ))}
                        </TextField>

                        <TextField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} error={Boolean(errors.phone)} helperText={errors.phone} fullWidth variant="standard" sx={{ mb: 2 }} />
                        <TextField label="Address" name="address" value={formData.address} onChange={handleChange} error={Boolean(errors.address)} helperText={errors.address} fullWidth variant="standard" sx={{ mb: 2 }} />
                        <TextField label="City" name="city" value={formData.city} onChange={handleChange} error={Boolean(errors.city)} helperText={errors.city} fullWidth variant="standard" sx={{ mb: 2 }} />
                        <TextField label="Country" name="country" value={formData.country} onChange={handleChange} error={Boolean(errors.country)} helperText={errors.country} fullWidth variant="standard" sx={{ mb: 2 }} />

                        <Divider sx={{ my: 2 }} />
                        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                            <Button variant="contained" color="primary" type="submit">
                                Add
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>

    )
}

export default ManageEmployee;