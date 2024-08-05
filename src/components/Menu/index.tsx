import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { CustomRouteMain } from "../../router/router";
import Toolbar from "@mui/material/Toolbar";
import { Box, Drawer } from "@mui/material";
const drawerWidth = 240;

interface MenuProps {
  routes: CustomRouteMain[];
  setIsClosing: (value: boolean) => void;
  setMobileOpen: (value: boolean) => void;
  mobileOpen: boolean;
}
function ResponsiveMenu({
  routes,
  setIsClosing,
  setMobileOpen,
  mobileOpen,
}: Readonly<MenuProps>) {
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const baseUrl = window.location.origin;
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {routes.map((route) => (
          <>
            {route.routes.map((routeChildren) => {
              if (!routeChildren.showInMenu) return null;
              const href =
                baseUrl +
                (route.path ? "/" : "") +
                route.path +
                (routeChildren.path ? "/" : "") +
                routeChildren.path;
              return (
                <ListItem key={routeChildren.path} disablePadding>
                  <ListItemButton component="a" href={href}>
                    <ListItemText primary={routeChildren.label} />
                  </ListItemButton>
                </ListItem>
              );
            })}
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default ResponsiveMenu;
