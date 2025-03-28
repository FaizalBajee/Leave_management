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

const ApprovedLeave: FC = () => {
    const [summary, setSummary] = useState<Summary[]>([])

    useEffect(() => {
        fetchSummary();
    }, [])

    const fetchSummary = async () => {

        try {
            const token = localStorage.getItem('token')
            const status = 'Approved'
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


    return (
        <div>
            {/* Table Section */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                    Approved Leave
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
        </div>
    )
}

export default ApprovedLeave;