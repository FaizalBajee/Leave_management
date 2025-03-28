import React, { useEffect, useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Divider, Alert, MenuItem, IconButton, InputAdornment } from "@mui/material";

interface Employee {
    id: number;
    empCode: string;
    fName: string;
    dept: string;
    lName: string,
    gender: string,
    email: string,
    dob: string,
    phone: string,
    address: string,
    city: string,
    country: string,
    createdAt: string;
}


const MyProfile = () => {

    const [employees, setEmployees] = useState<Employee[]>([]);

    const [empCode, setEmpCode] = useState<string>("");
    const [fName, setFName] = useState<string>("");
    const [lName, setLName] = useState<string>("");
    const [dept, setDept] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [dob, setDob] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [country, setCountry] = useState<string>("");


    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem("token");
            const code = localStorage.getItem("code")
            const response = await fetch(`http://localhost:8111/employee/getEmployee?empCode=${code}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch employees");
            }

            const data = await response.json();
            console.log(data.content.employees[0].empCode)
            setEmpCode(data.content.employees[0].empCode)
            setFName(data.content.employees[0].fName);
            setLName(data.content.employees[0].lName);
            setDept(data.content.employees[0].dept);
            setGender(data.content.employees[0].gender);
            setEmail(data.content.employees[0].email);
            setDob(data.content.employees[0].dob);
            setPhone(data.content.employees[0].phone);
            setAddress(data.content.employees[0].address);
            setCity(data.content.employees[0].city);
            setCountry(data.content.employees[0].country);
            setEmployees(data.content.employees || []);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };


    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8111/employee/editEmployee", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    fName: fName,
                    lName: lName,
                    email: email,
                    phone: phone,
                    address: address,
                    city: city,
                    country: country

                }),
            });

            const data = await response.json();
            if (data.success) {
                setMessage({ type: "success", text: data.message });
            } else {
                setMessage({ type: "error", text: data.message || "Update failed!" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Something went wrong!" });
        }

    };

    const [message, setMessage] = useState({ type: "", text: "" });

    return (
        <div style={{ maxWidth: 1100, margin: "auto" }}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: "left" }}>
                Update Profile
            </Typography>

            <Card sx={{ boxShadow: 3, p: 2 }}>
                <CardContent>
                    {message.type === "success" && <Alert severity="success" sx={{ mb: 2 }}>{message.text}</Alert>}
                    {message.type === "error" && <Alert severity="error" sx={{ mb: 2 }}>{message.text}</Alert>}


                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Employee Code"
                            name="empCode"
                            value={empCode}
                            disabled
                            fullWidth
                            variant="standard"
                            sx={{ mb: 2 }}
                        />

                        <TextField label="First Name" name="fName" value={fName} onChange={(e) => setFName(e.target.value)} fullWidth variant="standard" sx={{ mb: 2 }} ></TextField>
                        <TextField label="Last Name" name="lName" value={lName} onChange={(e) => setLName(e.target.value)} fullWidth variant="standard" sx={{ mb: 2 }} />

                        <TextField label="Gender" name="gender" value={gender} disabled fullWidth variant="standard" sx={{ mb: 2 }} />

                        <TextField label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth variant="standard" sx={{ mb: 2 }} />
                        <TextField label="Date of Birth" name="dob" disabled type="date" InputLabelProps={{ shrink: true }} value={dob} onChange={(e) => setDob(e.target.value)} fullWidth variant="standard" sx={{ mb: 2 }} />

                        <TextField label="Department" name="dept" disabled value={dept} fullWidth variant="standard" sx={{ mb: 2 }} />
                        <TextField label="Phone" name="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} fullWidth variant="standard" sx={{ mb: 2 }} />
                        <TextField label="Address" name="address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth variant="standard" sx={{ mb: 2 }} />
                        <TextField label="City" name="city" value={city} onChange={(e) => setCity(e.target.value)} fullWidth variant="standard" sx={{ mb: 2 }} />
                        <TextField label="Country" name="country" value={country} onChange={(e) => setCountry(e.target.value)} fullWidth variant="standard" sx={{ mb: 2 }} />

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
    );
};

export default MyProfile;