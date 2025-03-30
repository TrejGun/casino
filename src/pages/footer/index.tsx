import {FC, Fragment, useState} from "react";
import {AppBar, Box, Fab, Link, Toolbar} from "@mui/material";
import {Casino} from "@mui/icons-material";

import {GameDialog} from "./game-dialog";

export interface IFooterProps {
  onResults: (results: Array<string>) => void;
}

export const Footer: FC<IFooterProps> = props => {
  const {onResults: handleResults} = props;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <AppBar
        sx={{
          top: "auto",
          bottom: 0,
        }}
        position="fixed"
      >
        <Toolbar sx={theme => ({minHeight: theme.spacing(8)})}>
          <Fab
            color="secondary"
            sx={{
              position: "absolute",
              zIndex: 1,
              top: -30,
              left: 0,
              right: 0,
              margin: "0 auto",
            }}
            onClick={handleOpen}
          >
            <Casino />
          </Fab>
          <Box sx={{flexGrow: 1}} />
          <Link
            sx={theme => ({
              color: theme.palette.common.white,
              textDecoration: "none",
              fontWeight: 500,
              fontSize: 24,
              "&:hover": {
                textDecoration: "none",
              },
            })}
            href="https://github.com/TrejGun"
          >
            &copy; TrejGun
          </Link>
        </Toolbar>
      </AppBar>
      <GameDialog open={open} onClose={handleClose} onResults={handleResults} />
    </Fragment>
  );
};
