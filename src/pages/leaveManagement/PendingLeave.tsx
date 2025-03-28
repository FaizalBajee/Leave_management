import React, { FC, useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton } from "@mui/material";
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';

interface Summary {
    id: number;
    leaveType: string;
    from: string;
    to: string;
    createdAt: string;
    empCode: string;
    reason: string;
    status: string;
}

const PendingLeave: FC = () => {
    const [summary, setSummary] = useState<Summary[]>([])

    useEffect(() => {
        fetchSummary();
    }, [])

    const fetchSummary = async () => {
        try {
            const token = localStorage.getItem('token')
            const status = 'Pending'
            const response = await fetch(`http://localhost:8111/leave/leaveSummary?status=${status}`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data.content.summary)
            if (data.content.summary.length == 0) return
            setSummary(data.content.summary)
        } catch (error) {
            console.error("Error fetching leave summary:", error);
        }
    }

    const handleApprove = async (id: any, code: any) => {
        const status = 'Approved'
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8111/leave/updateStatus", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    empCode: code,
                    leaveId: id,
                    status: status
                }),
            });

            const data = await response.json();
            if (data.success) {
                alert(data.message)
                window.location.reload();
            } else {
                alert(data.message)

            }
        } catch (error) {
            console.log("error handling :" + error)
            // setMessage({ type: "error", text: "Something went wrong!" });
        }

    }

    const handleReject = async (id: any, code: any) => {
        const status = 'Rejected'
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("http://localhost:8111/leave/updateStatus", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    empCode: code,
                    leaveId: id,
                    status: status
                }),
            });

            const data = await response.json();
            if (data.success) {
                alert(data.message)
                window.location.reload();
            } else {
                alert(data.message)

            }
        } catch (error) {
            console.log("error handling :" + error)
            // setMessage({ type: "error", text: "Something went wrong!" });
        }


    }


    return (
        <div>
            {/* Table Section */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Pending Leave
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
                                <TableCell>Action</TableCell>
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
                                        <TableCell>
                                            <IconButton onClick={() => handleApprove(emp.id, emp.empCode)} color="primary">
                                                <CheckCircleTwoToneIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleReject(emp.id, emp.empCode)} color="error">
                                                <CancelTwoToneIcon />
                                            </IconButton>
                                        </TableCell>
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
        </div>
    )
}
export default PendingLeave;