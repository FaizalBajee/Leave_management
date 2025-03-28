import { RouteType } from "./config";
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LogoutIcon from '@mui/icons-material/Logout';
import DepartmentPageLayout from "../pages/department/DepartmentPageLayout";
import AddDepartment from "../pages/department/AddDepartment";
import ManageDepartment from "../pages/department/ManageDepartment";
import Logout from "../pages/logout/Logout";
import AddLeaveType from "../pages/leaveType/AddLeaveType";
import ManageLeaveType from "../pages/leaveType/ManageLeaveType";
import AddLeaveTypePageLayout from "../pages/leaveType/AddLeaveTypePageLayout";
import ManageEmployee from "../pages/employees/ManageEmployee";
import AddEmployee from "../pages/employees/AddEmployee";
import EmployeeLayoutPage from "../pages/employees/EmployeeLayoutPage";
import ChangePassword from "../pages/changePassword/ChangePassword";
import Dashboard from "../pages/dashboard/DashBoard";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LeaveManagementLayout from "../pages/leaveManagement/LeaveManagementLayout";
import AllLeave from "../pages/leaveManagement/AllLeave";
import PendingLeave from "../pages/leaveManagement/PendingLeave";
import ApprovedLeave from "../pages/leaveManagement/ApprovedLeave";
import RejectedLeave from "../pages/leaveManagement/RejectedLeave";
import MyProfile from "../pages/myProfile/MyProfile";
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import LeavePageLayout from "../pages/leave/LeavePageLayout";
import ApplyLeave from "../pages/leave/ApplyLeave";
import LeaveSummary from "../pages/leave/LeaveSummary";
import HailOutlinedIcon from '@mui/icons-material/HailOutlined';


const appRoutes: RouteType[] = [
  {
    path: "",
    index: true,
    element: <ChangePassword />,
    allowedRoles: ['admin', 'employee'],
    state: "changePassword",
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    state: "dashBoard",
    allowedRoles: ['admin'],
    sidebarProps: {
      displayText: "Dashboad",
      icon: <DashboardOutlinedIcon />,
    }
  },

  {
    path: "",
    element: <DepartmentPageLayout />,
    state: "department",
    allowedRoles: ['admin'],
    sidebarProps: {
      displayText: "Department",
      icon: <AppsOutlinedIcon />,
    },
    child: [
      {
        path: "department/addDepartment",
        element: <AddDepartment />,
        allowedRoles: ['admin'],
        state: "department.addDepartment",
        sidebarProps: {
          displayText: "Add Department",
        },
      },
      {
        path: "department/manageDepartment",
        element: <ManageDepartment />,
        allowedRoles: ['admin'],
        state: "department.manageDepartment",
        sidebarProps: {
          displayText: "Manage Department",
        },
      },
    ],
  },


  {
    path: "",
    element: <EmployeeLayoutPage />,
    allowedRoles: ['admin'],
    state: "employees",
    sidebarProps: {
      displayText: "Employees",
      icon: <BadgeOutlinedIcon />,
    },
    child: [
      {
        path: "employees/addEmployee",
        element: <AddEmployee />,
        allowedRoles: ['admin'],
        state: "employees.addEmployee",
        sidebarProps: {
          displayText: "Add Employee",
        },
      },
      {
        path: "employees/manageEmployee",
        element: <ManageEmployee />,
        allowedRoles: ['admin'],
        state: "employees.manageEmployee",
        sidebarProps: {
          displayText: "Manage Employee",
        },
      },
    ],
  },

  {
    path: "",
    element: <AddLeaveTypePageLayout />,
    allowedRoles: ['admin'],
    state: "leaveType",
    sidebarProps: {
      displayText: "leaveType",
      icon: <AppsOutlinedIcon />,
    },
    child: [
      {
        path: "leaveType/addLeaveType",
        element: <AddLeaveType />,
        allowedRoles: ['admin'],
        state: "leaveType.addLeaveType",
        sidebarProps: {
          displayText: "Add Leave Type",
        },
      },
      {
        path: "leaveType/manageLeave",
        element: <ManageLeaveType />,
        allowedRoles: ['admin'],
        state: "leaveType.manageLeave",
        sidebarProps: {
          displayText: "Manage Leave Type",
        },
      },
    ],
  },

  {
    path: "",
    element: <LeaveManagementLayout />,
    allowedRoles: ['admin'],
    state: "leaveManagement",
    sidebarProps: {
      displayText: "leaveManagement",
      icon: <AppsOutlinedIcon />,
    },
    child: [
      {
        path: "leaveManagement/allLeave",
        element: <AllLeave />,
        allowedRoles: ['admin'],
        state: "leaveManagement.allLeave",
        sidebarProps: {
          displayText: "All Leave",
        },
      },
      {
        path: "leaveManagement/pendingLeave",
        element: <PendingLeave />,
        allowedRoles: ['admin'],
        state: "leaveManagement.pendingLeave",
        sidebarProps: {
          displayText: "Pending Leave",
        },
      },
      {
        path: "leaveManagement/approvedLeave",
        element: <ApprovedLeave />,
        allowedRoles: ['admin'],
        state: "leaveManagement.approvedLeave",
        sidebarProps: {
          displayText: "Approved Leave",
        },
      },
      {
        path: "leaveManagement/rejectedLeave",
        element: <RejectedLeave />,
        allowedRoles: ['admin'],
        state: "leaveManagement.rejectedLeave",
        sidebarProps: {
          displayText: "Rejected Leave",
        },
      },
    ],
  },

  {
    path: "myProfile",
    element: <MyProfile />,
    allowedRoles: ['employee'],
    state: "myProfile",
    sidebarProps: {
      displayText: "My Profile",
      icon: < AssignmentIndOutlinedIcon />,
    },
  },
  {
    path: "",
    element: <LeavePageLayout />,
    allowedRoles: ['employee'],
    state: "leave",
    sidebarProps: {
      displayText: "Leave",
      icon: <HailOutlinedIcon />,
    },
    child: [
      {
        path: "leave/applyLeave",
        element: <ApplyLeave />,
        allowedRoles: ['employee'],
        state: "leave.applyLeave",
        sidebarProps: {
          displayText: "Apply Leave",
        },
      },
      {
        path: "leave/leaveSummary",
        element: <LeaveSummary />,
        allowedRoles: ['employee'],
        state: "leave.leaveSummary",
        sidebarProps: {
          displayText: "Leave Summary",
        },
      },
    ],
  },
  {
    path: "changePassword",
    element: <ChangePassword />,
    allowedRoles: ['admin', 'employee'],
    state: "changePassword",
    sidebarProps: {
      displayText: "changePassword",
      icon: <AppRegistrationIcon />,
    },
  },

  {
    path: "logout",
    element: <Logout />,
    allowedRoles: ['admin', 'employee'],
    state: "logout",
    sidebarProps: {
      displayText: "Logout",
      icon: <LogoutIcon />,
    },
  },




]



// 🌟 ADMIN-SPECIFIC ROUTES
// const adminRoutes: RouteType[] = [
//   {
//     path: "",
//     element: <DepartmentPageLayout />,
//     state: "department",
//     sidebarProps: {
//       displayText: "Department",
//       icon: <AppsOutlinedIcon />,
//     },
//     child: [
//       {
//         path: "department/addDepartment",
//         element: <AddDepartment />,
//         state: "department.addDepartment",
//         sidebarProps: {
//           displayText: "Add Department",
//         },
//       },
//       {
//         path: "department/manageDepartment",
//         element: <ManageDepartment />,
//         state: "department.manageDepartment",
//         sidebarProps: {
//           displayText: "Manage Department",
//         },
//       },
//     ],
//   },
// ];

// // 🌟 EMPLOYEE-SPECIFIC ROUTES (Add more as needed)
// const employeeRoutes: RouteType[] = [
//   {
//     path: "documentation",
//     element: <HomePage />, // Replace with an employee-specific page
//     state: "documentation",
//     sidebarProps: {
//       displayText: "Documentation",
//       icon: <ArticleOutlinedIcon />,
//     },
//   },
// ];

// 🌟 FINAL ROUTE MERGING
// const appRoutes: RouteType[] = [
//   ...commonRoutes,
//   ...(userRole === "admin" ? adminRoutes : employeeRoutes),
// ];

export default appRoutes;
