import { AppBar, Toolbar, Typography } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";

const Topbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${sizeConfigs.sidebar.width})`,
        ml: sizeConfigs.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color
      }}
    >
      <Toolbar sx={{ background: "linear-gradient(to right,rgb(200, 197, 197),rgb(203, 202, 202))", color: "white", justifyContent: "left" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: 1 }}>
          Employee Leave Management System
        </Typography>
      </Toolbar>

    </AppBar>
  );
};

export default Topbar;