import React, { useEffect, useState } from "react";
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

interface Department {
    id: number;
    deptCode: string;
    deptName: string;
    deptSN: string;
    createdAt: string;
}

const ManageDepartment: React.FC = () => {

    const [departments, setDepartments] = useState<Department[]>([]);


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
                // console.log(data.content.department.length)
                setDepartments(data.content.department || []);

            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();
    }, []);



    return (

        <div>
            <h2>Manage Departments</h2>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead  sx={{ bgcolor: "#eeeeee" }}>
                        <TableRow>
                            <TableCell>Sl No</TableCell>
                            <TableCell>Dept Code</TableCell>
                            <TableCell>Dept Name</TableCell>
                            <TableCell>Dept Short Name</TableCell>
                            <TableCell>Creation Date</TableCell>
                            {/* <TableCell>Action</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {departments.length > 0 ? (
                            departments.map((dept, index) => (
                                <TableRow key={dept.id || index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{dept.deptCode}</TableCell>
                                    <TableCell>{dept.deptName}</TableCell>
                                    <TableCell>{dept.deptSN}</TableCell>
                                    <TableCell>{dept.createdAt ? new Date(dept.createdAt).toLocaleDateString("en-GB") : "N/A"}</TableCell>
                    
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} style={{ textAlign: "center" }}>No Departments Found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default ManageDepartment;