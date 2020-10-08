import React from "react";
import { Typography, Popper, Fade, Paper } from "@material-ui/core";

export default function Popup(props) {
  const { anchorEl, placement, classes, activeOverview, open } = props;

  return (
    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <Typography className={classes.typography}>
              {activeOverview}
            </Typography>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
}
