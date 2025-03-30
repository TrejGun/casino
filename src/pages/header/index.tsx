import {FC} from "react";
import {AppBar, Box, Link, Toolbar} from "@mui/material";

import {Login} from "./login";
import {Balance} from "./balance";

export const Header: FC = () => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={theme => ({minHeight: theme.spacing(8)})}>
        <Link
          sx={theme => ({
            color: theme.palette.common.white,
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 36,
            "&:hover": {
              textDecoration: "none",
            },
            display: {xs: "none", sm: "block"}
          })}
          href="/"
        >
          Casino Royal
        </Link>
        <Box sx={{flexGrow: 1}} />
        <Balance />
        <Login />
      </Toolbar>
    </AppBar>
  );
};
