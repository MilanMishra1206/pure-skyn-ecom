import { Box, SwipeableDrawer } from "@mui/material";
import React from "react";

export default function CustomDrawer({
  open,
  setOpen,
  classes = "z-[1001]",
  children,
  anchorPosition = "bottom",
  childClass,
  paperClass,
  boxClass = "h-auto",
  paperClassToOverride = "",
}) {
  return (
    <SwipeableDrawer
      anchor={anchorPosition}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      PaperProps={{
        className: `${anchorPosition === "bottom" ? paperClass : ""} ${
          paperClassToOverride || ""
        }`,
      }}
      className={`${classes}`}
    >
      <Box className={`!overflow-scroll scrollbar-hide ${boxClass}`}>
        <div className={childClass}>
          {React.Children.map(children, (child) => React.cloneElement(child))}
        </div>
      </Box>
    </SwipeableDrawer>
  );
}
