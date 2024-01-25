import React, { useRef } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import { NavigationDrawer } from "src/components/common/NavigationDrawer.tsx";

export { BaseContainer };

interface BaseContainerProps {
  title: string;
  children: React.ReactNode;
}

/**
 * BaseContainer. Every page should be wrapped in this container.
 *
 * It provides a navigation drawer and a top app bar.
 *
 * @param title The title of the page to be displayed in the app bar.
 * @param children The content of the page.
 */
function BaseContainer({
  title,
  children,
}: BaseContainerProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const appBarRef = useRef<HTMLElement>(null);

  return (
    <Box
      sx={{
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        width: "100%",
        height: "100%",
      }}
    >
      <AppBar
        ref={appBarRef}
        sx={{
          position: "sticky",
          top: 0,
          minHeight: "64px",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Grid container>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{ mr: 2 }}
                color="inherit"
                onClick={() => setOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Typography noWrap variant="h6">
                {title}
              </Typography>
              <Box
                id={"navbarPortal"}
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flex: 1,
                }}
              ></Box>
            </Grid>
            <Grid item xs={12}>
              <Box id={"navTabs"}></Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <NavigationDrawer open={open} onClose={() => setOpen(false)} />
      <Box
        sx={{
          paddingBottom: "64px",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
