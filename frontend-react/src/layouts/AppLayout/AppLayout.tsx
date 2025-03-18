import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";

const AppLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <AppHeader></AppHeader>
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
