import { appColors } from "@/configs/layout.config";
import { Avatar, Box, Button, colors, IconButton, styled } from "@mui/material";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
const HeaderStyled = styled(Box)({
  height: 60,
  width: "100%",
});
const HeaderContentStyled = styled(Box)({
  height: 60,
  width: "100%",
  position: "fixed",
  top: 0,
  left: 0,
  backgroundColor: appColors.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 24px",
});

const AppHeaderMenuItem: React.FC<{ to: string; label: string }> = ({
  to,
  label,
}) => {
  return (
    <NavLink to={to} style={{ textDecoration: "none" }}>
      {({ isActive = false }) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: 18,
              fontWeight: 600,
              padding: 1,
              paddingBottom: 0.5,
              borderBottomWidth: "3px",
              borderBottomStyle: isActive ? "solid" : "none",
              color: appColors.white,
            }}
          >
            {label}
          </Box>
        );
      }}
    </NavLink>
  );
};

const AppHeader: React.FC = () => {
  return (
    <HeaderStyled>
      <HeaderContentStyled>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <AppHeaderMenuItem to="/home" label="Home" />
          <AppHeaderMenuItem to="/projects" label="Projects" />
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton>
            <NotificationsIcon sx={{ color: colors.grey[100] }} />
          </IconButton>
          <Avatar alt="Remy Sharp" />
        </Box>
      </HeaderContentStyled>
    </HeaderStyled>
  );
};

export default AppHeader;
