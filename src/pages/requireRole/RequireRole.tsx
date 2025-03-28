import React from "react";
import { Navigate } from "react-router-dom";

const RequireRole = ({ children, role }: { children: React.ReactNode; role: string }) => {
  const userRole = localStorage.getItem("role");

  return userRole === role ? <>{children}</> : null; 
};

export default RequireRole;
