import React, { FC, useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

interface Summary {
    id: number;
    leaveType: string;
    from: string;
    to: string;
    empCode: string;
    createdAt: string;
    reason: string;
    status: string;
}

const Dashboard: FC = () => {
    const [count, setCount] = useState({ empCount: 0, deptCount: 0, leaveTypeCount: 0 });

    const [summary, setSummary] = useState<Summary[]>([])

    useEffect(() => {
        fetchDepartmentsCount();
        fetchEmployeesCount();
        fetchLeaveTypeCount();
        fetchSummary();
    }, []);

    const fetchDepartmentsCount = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8111/department/getDepartment", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch departments");
            }
            const data = await response.json();
            setCount(prevState => ({ ...prevState, deptCount: data.content.department.length }));
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };
    const fetchEmployeesCount = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8111/employee/getEmployee", {
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
            console.log(data.content.employees.length)
            setCount(prevState => ({ ...prevState, empCount: data.content.employees.length }));
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };
    const fetchLeaveTypeCount = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:8111/leavetype/getLeaveType", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch departments");
            }
            const data = await response.json();
            console.log(data.content.leaveType)
            setCount(prevState => ({ ...prevState, leaveTypeCount: data.content.leaveType.length }));

        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    const fetchSummary = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8111/leave/leaveSummary`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await response.json()
        console.log(data.content.summary)
        if(data.content.summary.length === 0) return
        setSummary(data.content.summary)

    }



    return (
        <Box sx={{ p: 4, bgcolor: "#f4f4f4", minHeight: "100vh" }}>
            {/* Info Cards */}
            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    mb: 4,
                    flexWrap: "wrap",
                    justifyContent: "center",
                }}
            >
                {/* Employee Card */}
                <Card
                    sx={{
                        flex: 1,
                        minWidth: 250,
                        textAlign: "center",
                        borderRadius: 3,
                        boxShadow: 5,
                        transition: "0.3s",
                        background: "linear-gradient(135deg, #42a5f5, #1e88e5)",
                        color: "white",
                        "&:hover": { boxShadow: 8, transform: "scale(1.05)" },
                    }}
                >
                    <CardContent>
                        <Typography variant="h6">Total Registered Employees</Typography>
                        <Typography variant="h3" fontWeight="bold">
                            {count.empCount}
                        </Typography>
                    </CardContent>
                </Card>

                {/* Department Card */}
                <Card
                    sx={{
                        flex: 1,
                        minWidth: 250,
                        textAlign: "center",
                        borderRadius: 3,
                        boxShadow: 5,
                        transition: "0.3s",
                        background: "linear-gradient(135deg, #66bb6a, #388e3c)",
                        color: "white",
                        "&:hover": { boxShadow: 8, transform: "scale(1.05)" },
                    }}
                >
                    <CardContent>
                        <Typography variant="h6">Total Departments</Typography>
                        <Typography variant="h3" fontWeight="bold">
                            {count.deptCount}
                        </Typography>
                    </CardContent>
                </Card>

                {/* Leave Type Card */}
                <Card
                    sx={{
                        flex: 1,
                        minWidth: 250,
                        textAlign: "center",
                        borderRadius: 3,
                        boxShadow: 5,
                        transition: "0.3s",
                        background: "linear-gradient(135deg, #ff7043, #e64a19)",
                        color: "white",
                        "&:hover": { boxShadow: 8, transform: "scale(1.05)" },
                    }}
                >
                    <CardContent>
                        <Typography variant="h6">Total Leave Types</Typography>
                        <Typography variant="h3" fontWeight="bold">
                            {count.leaveTypeCount}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>

            {/* Table Section */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Latest Leave Applications
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ bgcolor: "#eeeeee" }}>
                            <TableRow>
                                <TableCell>S.No</TableCell>
                                <TableCell>Leave Type</TableCell>
                                <TableCell>From Date</TableCell>
                                <TableCell>To Date</TableCell>
                                <TableCell>EmpCode</TableCell>
                                <TableCell>Posted At</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {summary.length > 0 ? (
                                summary.map((emp, index) => (
                                    <TableRow key={emp.id || index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{emp.leaveType}</TableCell>
                                        <TableCell>{emp.from}</TableCell>
                                        <TableCell>{emp.to}</TableCell>
                                        <TableCell>{emp.empCode}</TableCell>
                                        <TableCell>{emp.createdAt ? new Date(emp.createdAt).toLocaleDateString('en-GB') : 'N/A'}</TableCell>
                                        <TableCell>{emp.status}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} style={{ textAlign: "center" }}>
                                        No Data Found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
}
export default Dashboard;