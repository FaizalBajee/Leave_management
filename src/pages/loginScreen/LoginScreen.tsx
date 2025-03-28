import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Divider,
} from "@mui/material";
import { BaseURL } from "../../Environment/environment"
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"admin" | "employee">("admin");
  const [responseMessage, setResponseMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

  }, [])

  const handleAdminLoginClick = () => {
    setRole("admin");
  };

  const handleEmployeeLoginClick = () => {
    setRole("employee");
  };

  const handleLogin = async () => {
    if (!username) {
      setResponseMessage("Fill username")
      return;
    }
    if (!password) {
      setResponseMessage("Fill password")
      return;
    }
    try {
      const response = await fetch(`${BaseURL}/login?username=${username}&password=${password}`);
      const data = await response.json();

      console.log("Response:", data?.name);
      const name = data?.content?.name
      const code = data?.content?.empCode
      const role = data?.content?.role
      const token = data?.content?.accessToken

      console.log(name, role, token)

      if (data.success) {
        localStorage.setItem("name", name);
        localStorage.setItem("role", role);
        localStorage.setItem("code", code);
        localStorage.setItem("token", token);
        navigate("/home")
        setResponseMessage(`Success: ${data.message}`);
      } else {
        setResponseMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setResponseMessage("Server error. Please try again later.");
    }

  };

  return (
    <div>
      {/* Header Section */}
      <div
        style={{
          width: "100%",
          height: "50px",
          background: "#d3d3d3",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <span
          onClick={handleAdminLoginClick}
          style={{
            fontWeight: "bold",
            margin: "5px",
            cursor: "pointer",
            color: role === "admin" ? "#008080" : "black",
          }}
        >
          Admin Login
        </span>
        <label>|</label>
        <span
          onClick={handleEmployeeLoginClick}
          style={{
            fontWeight: "bold",
            margin: "5px",
            cursor: "pointer",
            color: role === "employee" ? "#008080" : "black",
          }}
        >
          Employee Login
        </span>
      </div>
      <div >

        <h4
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            marginTop: "40px",
            textAlign: "center",
            color: "black",
          }}
        >
          Welcome to ELMS
        </h4>

        {/* Login Card */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="40vh"
        // bgcolor="#f5f5f5"
        >
          <Card sx={{ maxWidth: 400, width: "100%", padding: 2, boxShadow: 3 }}>
            <CardContent>
              <Typography style={{ color: "grey" }} variant="h5" align="left" fontWeight="bold" gutterBottom>
                {role} Login
              </Typography>

              {responseMessage && (
                <Typography
                  color={responseMessage.includes("Success") ? "green" : "red"}
                  align="left"
                  sx={{ mt: 2, fontWeight: "" }}
                >
                  {responseMessage}
                </Typography>
              )}

              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                margin="normal"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Divider sx={{ my: 2 }} />

              <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <button
                  style={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    padding: "10px 16px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                    width: "120px",
                    textAlign: "center",
                  }}
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>

            </CardContent>
          </Card>
        </Box>




      </div>

    </div>
  );
};

export default LoginPage;
