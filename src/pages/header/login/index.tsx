import {FC, Fragment, MouseEvent, useContext, useState} from "react";
import {Button, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import {AccountCircle} from "@mui/icons-material";

import {IUser, UserContext} from "../../../components/user-provider";
import {LoginDialog} from "./login-dialog";

export const Login: FC = () => {
  const [anchor, setAnchor] = useState<Element | null>(null);
  const [open, setOpen] = useState(false);

  const user = useContext(UserContext);

  const handleMenuOpen = (event: MouseEvent): void => {
    setAnchor(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchor(null);
  };

  const handleLoginClick = (e: MouseEvent): void => {
    e.preventDefault();
    setOpen(true);
  };

  const handleLogoutClick = (e: MouseEvent): void => {
    e.preventDefault();
    user.logOut();
    handleMenuClose();
  };

  const handleLogin = (profile: IUser) => {
    user.logIn(profile);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!user.isAuthenticated()) {
    return (
      <Fragment>
        <Button
          sx={theme => ({
            color: theme.palette.common.white,
            borderColor: theme.palette.common.white,
          })}
          variant="outlined"
          size="large"
          onClick={handleLoginClick}
        >
          Login
        </Button>
        <LoginDialog open={open} onClose={handleClose} onLogin={handleLogin} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <IconButton onClick={handleMenuOpen} color="inherit">
        <Tooltip title={user.profile.name}>
          <AccountCircle />
        </Tooltip>
      </IconButton>
      <Menu id="material-appbar" anchorEl={anchor} open={!!anchor} onClose={handleMenuClose}>
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </Fragment>
  );
};
