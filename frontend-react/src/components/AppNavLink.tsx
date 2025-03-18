import { appColors } from "@/configs/layout.config";
import { colors, styled } from "@mui/material";
import * as React from "react";
import { NavLink, NavLinkProps } from "react-router-dom";

const NavLinkStyled = styled(NavLink)({
  all: "unset",
  color: appColors.primary,
  cursor: "pointer",
  ":hover": {
    textDecoration: "underline",
  },
});

const AppNavLink = (props: NavLinkProps): React.ReactElement => {
  return <NavLinkStyled {...props} />;
};

export default AppNavLink;
