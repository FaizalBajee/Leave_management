import React, { FC, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";

interface Summary {
    id: number;
    leaveType: string;
    from: string;
    to: string;
    createdAt: string;
    reason: string;
    status: string;
}

const LeaveSummary: FC = () => {

    const [summary, setSummary] = useState<Summary[]>([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        const code = localStorage.getItem('code')
        const fetchSummary = async () => {
            const response = await fetch(`http://localhost:8111/leave/leaveSummary?empCode=${code}`, {
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

        }
        fetchSummary();
    }, [])

    return (
        <div>
            <h2>Leave Summary</h2>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: "#eeeeee" }}>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Leave Type</TableCell>
                            <TableCell>From Date</TableCell>
                            <TableCell>To Date</TableCell>
                            <TableCell>Reason</TableCell>
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
                                    <TableCell>{emp.reason}</TableCell>
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
        </div>
    )
}
export default LeaveSummary;