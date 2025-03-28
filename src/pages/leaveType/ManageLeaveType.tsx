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
    TextField,
} from "@mui/material";

interface leaveType {
    id: number;
    leaveType: string;
    description: string;
    createdAt: string;
}

const ManageLeaveType: FC = () => {

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


    return (
        <div>
            <h2>Manage Leave Type</h2>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ bgcolor: "#eeeeee" }}>
                        <TableRow>
                            <TableCell>Sl No</TableCell>
                            <TableCell>Leave type</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Creation Date</TableCell>
                            {/* <TableCell>Action</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leavetype.length > 0 ? (
                            leavetype.map((type, index) => (
                                <TableRow key={type.id || index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{type.leaveType}</TableCell>
                                    <TableCell>{type.description}</TableCell>
                                    <TableCell>{type.createdAt ? new Date(type.createdAt).toLocaleDateString("en-GB") : "N/A"}</TableCell>
                              
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: "center" }}>No Data Found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ManageLeaveType;