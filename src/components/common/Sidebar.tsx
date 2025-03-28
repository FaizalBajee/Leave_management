import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
// import assets from "../../assets";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Sidebar = () => {
  const name = localStorage.getItem("name")
  const userRole = localStorage.getItem("role") || "";

  // 🔹 Filter routes based on user role
  const filteredRoutes = appRoutes.filter(route => {
    if (!route.sidebarProps) return false; // Skip routes without sidebar props
    if (route.allowedRoles && !route.allowedRoles.includes(userRole)) {
      return false; // Hide if user role is not allowed
    }
    return true;
  });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sizeConfigs.sidebar.width,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color
        }
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: "20px" }}>
          <Stack
            sx={{ width: "100%" }} direction="column" justifyContent="center" alignItems="center"
          >
            <AccountCircleIcon
              sx={{ width: 70, height: 70, cursor: "pointer", margin: 1 }}

            />
            <span>{name}</span>
          </Stack>
        </Toolbar>
        {/* 🔹 Render only allowed routes */}
        {filteredRoutes.map((route, index) => (
          route.child ? (
            <SidebarItemCollapse item={route} key={index} />
          ) : (
            <SidebarItem item={route} key={index} />
          )
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;