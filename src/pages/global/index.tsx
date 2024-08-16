import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { CustomRouteMain } from "../../router/router";
import ResponsiveMenu from "../../components/Menu";
import { useState } from "react";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Help } from "../../components/Menu/Help";
const drawerWidth = 240;

interface ResponsiveDrawerProps {
  children: React.ReactNode;
  routes: CustomRouteMain[];
}
function ResponsiveDrawer({ children, routes }: Readonly<ResponsiveDrawerProps>) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const [openHelp, setOpenHelp] = useState<boolean>(false);

  return (
    <Box sx={{ display: "flex", width: '100%', minHeight: '100vh', overflow: 'auto' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            flexGrow={1}
            display='flex'
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Typography variant="h6" noWrap component="div">
              BluConnect
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={() => setOpenHelp(true)}
            >
              <HelpOutlineIcon />
            </IconButton>
            <Help open={openHelp} onClose={() => setOpenHelp(false)} />
          </Box>
        </Toolbar>
      </AppBar>
      <ResponsiveMenu
        mobileOpen={mobileOpen}
        routes={routes}
        setIsClosing={setIsClosing}
        setMobileOpen={setMobileOpen}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)`, md: '100%', lg: '100%' },
        }}
        width={'100%'}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
