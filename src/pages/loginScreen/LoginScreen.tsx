import React from "react";

const LoginScreen: React.FC = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <button onClick={() => alert("Admin Login Clicked")}>Admin Login</button>
      <button onClick={() => alert("Employee Login Clicked")}>
        Employee Login
      </button>
    </div>
  );
};

export default LoginScreen;
