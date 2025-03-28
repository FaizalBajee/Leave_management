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
} from "@mui/material";
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone';
import RestoreFromTrashTwoToneIcon from '@mui/icons-material/RestoreFromTrashTwoTone';

interface Employee {
    id: number;
    empCode: string;
    fName: string;
    dept: string;
    createdAt: string;
}

const ManageEmployees: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const fetchEmployees = async () => {
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
                setEmployees(data.content.employees || []);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };

        fetchEmployees();
    }, []);

    const handleDelete = async (empCode: string) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8111/employee/deleteEmployee?empCode=${empCode}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            });

            const data = await response.json();
            console.log(data.message);

            if (response.ok) {
                setEmployees((prev) => prev.filter((emp) => emp.empCode !== empCode));
            }
        } catch (error) {
            console.error("Error deleting employee:", error);
        }
    }



    const handleEdit = (empCode: string) => {
        console.log("Function not implemented.");
    }

    return (
        <div>
            <h2>Manage Employees</h2>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead  sx={{ bgcolor: "#eeeeee" }}>
                        <TableRow>
                            <TableCell>S.No</TableCell>
                            <TableCell>Employee Code</TableCell>
                            <TableCell>Employee Name</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.length > 0 ? (
                            employees.map((emp, index) => (
                                <TableRow key={emp.id || index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{emp.empCode}</TableCell>
                                    <TableCell>{emp.fName}</TableCell>
                                    <TableCell>{emp.dept}</TableCell>
                                    <TableCell>
                                        {/* <IconButton onClick={() => handleEdit(emp.empCode)} color="primary">
                                            <BorderColorTwoToneIcon />
                                        </IconButton> */}
                                        <IconButton onClick={() => handleDelete(emp.empCode)} color="error">
                                            <RestoreFromTrashTwoToneIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} style={{ textAlign: "center" }}>
                                    No Employees Found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};


export default ManageEmployees;
