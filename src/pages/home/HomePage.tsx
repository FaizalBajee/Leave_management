import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const HomePage = (props: Props) => {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Our App!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Admin Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition cursor-pointer"
          // onClick={() => handleNavigate("admin")}
          >
          <img src="/assets/admin.svg" alt="Admin" className="w-20 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Admin Panel</h2>
          <p className="text-gray-500">Manage users, settings, and more.</p>
        </div>

        {/* Employee Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-2xl transition cursor-pointer"
          // onClick={() => handleNavigate("employee")}
          >
          <img src="/assets/employee.svg" alt="Employee" className="w-20 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">Employee Portal</h2>
          <p className="text-gray-500">Access tasks, reports, and more.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;