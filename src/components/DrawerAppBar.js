import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

const drawerWidth = 240;
const navItems = ['Sign Up', 'Login', 'Create Routine', 'View Routines'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', color: 'black', }}>
      <Typography variant="h6" sx={{ my: 2, textAlign: 'left', color: 'black' }}>
        Stay Fit App
      </Typography>
      <Divider />
      <List  >
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center', color: 'black', fontWeight: '800', }}>
              <NavLink
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                style={{
                  color: 'black',
                  textDecoration: 'none', // Remove default hyperlink styling
                  textAlign: 'center',   // Center the text
                  width: '100%',         // Optional: Set the width to take full width of the ListItemButton
                  display: 'block',      // Optional: Make the NavLink a block element to take full width
                }}
              >
                <ListItemText  primary={item} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', height: '20px' }}>
      <CssBaseline />
      <AppBar component="nav" style={{ background: 'white', color: 'black', fontWeight: '600' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, textAlign: 'left', fontWeight: '600' }}
          >
            Stay Fit App
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <NavLink to={'/signup'}>
              <Button sx={{ color: 'black', fontWeight: '600' }}>Sign Up</Button>
            </NavLink>
            <NavLink to={'/login'}>
              <Button sx={{ color: 'black', fontWeight: '600' }}>Log In</Button>
            </NavLink>
            <NavLink to={'/workouts/create'}>
              <Button sx={{ color: 'black', fontWeight: '600' }}>New Workout</Button>
            </NavLink>
            <NavLink to={'/workouts'}>
              <Button sx={{ color: 'black', fontWeight: '600' }}>See Workouts</Button>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
