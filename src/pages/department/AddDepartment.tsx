import React, { useState } from "react";
import axios from 'axios'
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Divider,
  Button,
  Alert,
} from "@mui/material";

const AddDepartment: React.FC = () => {
  const [message, setMessage] = useState<{ type: "success" | "error" | null; text: string }>({
    type: null,
    text: "",
  });
  // State for form fields
  const [formData, setFormData] = useState({
    deptCode: "",
    deptName: "",
    deptSN: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({
    deptCode: "",
    deptName: "",
    deptSN: "",
  });

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

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    let newErrors = { deptCode: "", deptName: "", deptSN: "" };

    if (!formData.deptCode.trim()) {
      newErrors.deptCode = "Department Code is required";
      isValid = false;
    }
    if (!formData.deptName.trim()) {
      newErrors.deptName = "Department Name is required";
      isValid = false;
    }
    if (!formData.deptSN.trim()) {
      newErrors.deptSN = "Department Short Name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(
          "http://localhost:8111/department/addDepartment",
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
            deptCode: "",
            deptName: "",
            deptSN: "",
          });

        } else {
          setMessage({ type: "error", text: data.message || "Failed to add department!" });
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
        Add Department
      </Typography>

      <Card sx={{ boxShadow: 3, p: 2 }}>
        <CardContent>

          {message.type === "success" && <Alert severity="success" sx={{ mb: 2 }}>{message.text}</Alert>}
          {message.type === "error" && <Alert severity="error" sx={{ mb: 2 }}>{message.text}</Alert>}

          {/* <Divider sx={{ mb: 2 }} /> */}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Department Code"
              name="deptCode"
              value={formData.deptCode}
              onChange={handleChange}
              error={Boolean(errors.deptCode)}
              helperText={errors.deptCode}
              fullWidth
              variant="standard"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Department Name"
              name="deptName"
              value={formData.deptName}
              onChange={handleChange}
              error={Boolean(errors.deptName)}
              helperText={errors.deptName}
              fullWidth
              variant="standard"
              sx={{ mb: 2 }}
            />
            <TextField
              label="Department Short Name"
              name="deptSN"
              value={formData.deptSN}
              onChange={handleChange}
              error={Boolean(errors.deptSN)}
              helperText={errors.deptSN}
              fullWidth
              variant="standard"
              sx={{ mb: 2 }}
            />

            <Divider sx={{ my: 2 }} />
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
              <Button variant="contained" color="primary" type="submit"  >
                Add
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDepartment;
