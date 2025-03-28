import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {

        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        localStorage.removeItem("code");


        navigate("/");


    }, []);

    return null;
}

export default Logout;