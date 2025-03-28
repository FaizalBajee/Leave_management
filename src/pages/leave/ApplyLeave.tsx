import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Divider, Alert, MenuItem, IconButton, InputAdornment } from "@mui/material";

interface leaveType {
    id: number;
    leaveType: string;
    description: string;
    createdAt: string;
}

const ApplyLeave: FC = () => {

    const [leavetype, setLeaveType] = useState<leaveType[]>([])

    useEffect(() => {
        const fetchLeaveType = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch("http://localhost:8111/leavetype/getLeaveType", {
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
                console.log(data.content.leaveType)
                setLeaveType(data.content.leaveType || []);

            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchLeaveType();
    }, []);

    // State for validation errors
    const [errors, setErrors] = useState({
        from: "",
        to: "",
        leaveType: "",
        reason: ""
    });
    const [message, setMessage] = useState({ type: "", text: "" });

    const [formData, setFormData] = useState({
        from: "",
        to: "",
        leaveType: "",
        reason: ""
    });

    const validateForm = () => {
        let isValid = true;
        let newErrors = {
            from: "",
            to: "",
            leaveType: "",
            reason: ""
        };

        if (!formData.from.trim()) {
            newErrors.from = "From date is required";
            isValid = false;
        }
        if (!formData.to.trim()) {
            newErrors.to = "To date is required";
            isValid = false;
        }
        if (!formData.leaveType.trim()) {
            newErrors.leaveType = "leaveType is required";
            isValid = false;
        }
        if (!formData.reason.trim()) {
            newErrors.reason = "reason is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));


        // Clear error message when user types
        setErrors({
            ...errors,
            [event.target.name]: "",
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData)

        if (validateForm()) {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(
                    "http://localhost:8111/leave/applyLeave",
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
                        from: "",
                        to: "",
                        leaveType: "",
                        reason: ""
                    });

                } else {
                    setMessage({ type: "error", text: data.message || "Failed to Apply Leave!" });
                }
            } catch (error) {
                setMessage({ type: "error", text: "Something went wrong!.." });
            }
        } else {
            setMessage({ type: "error", text: "Please fill in all required fields." });
        }



    };

    return (
        <div style={{ maxWidth: 1100, margin: "auto" }}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: "left" }}>
                Apply Leave
            </Typography>

            <Card sx={{ boxShadow: 3, p: 2 }}>
                <CardContent>
                    {message.type === "success" && <Alert severity="success" sx={{ mb: 2 }}>{message.text}</Alert>}
                    {message.type === "error" && <Alert severity="error" sx={{ mb: 2 }}>{message.text}</Alert>}

                    {/* <Divider sx={{ mb: 2 }} /> */}

                    <form onSubmit={handleSubmit}>


                        <TextField label="From Date" name="from" type="date" InputLabelProps={{ shrink: true }} value={formData.from} onChange={handleChange} error={Boolean(errors.from)} helperText={errors.from} fullWidth variant="standard" sx={{ mb: 2 }} />
                        <TextField label="To Date" name="to" type="date" InputLabelProps={{ shrink: true }} value={formData.to} onChange={handleChange} error={Boolean(errors.to)} helperText={errors.to} fullWidth variant="standard" sx={{ mb: 2 }} />
                        <TextField label="Leave Type" name="leaveType" select value={formData.leaveType} onChange={handleChange} error={Boolean(errors.leaveType)} helperText={errors.leaveType} fullWidth variant="standard" sx={{ mb: 2 }} >
                            {leavetype.map((data) => (
                                <MenuItem key={data.id} value={data.leaveType}>{data.leaveType}</MenuItem>
                            ))}
                        </TextField>
                        <TextField label="Reason" name="reason" value={formData.reason} onChange={handleChange} error={Boolean(errors.reason)} helperText={errors.reason} fullWidth variant="standard" sx={{ mb: 2 }} />


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
export default ApplyLeave;