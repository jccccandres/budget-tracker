import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Box, Button, Divider, Grid, IconButton, List, ListItem, styled, SwipeableDrawer, Toolbar, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useSnackbar } from 'notistack';

import { useLogInStore, useTokenStore, useTypeStore } from '../stores';

import FilterDrawer from '../components/FilterDrawer';

import { logout, getTypes } from '../api';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1)
}));

const Layout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  }
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  }

  const [secondDrawerOpen, setSecondDrawerOpen] = useState(false);
  const handleSecondDrawerOpen = () => {
    setSecondDrawerOpen(true);
  }
  const handleSecondDrawerClose = () => {
    setSecondDrawerOpen(false);
  }

  const { loggedOut, setUser, user } = useLogInStore(
		state => ({ loggedOut: state.loggedOut, setUser: state.setUser, user: state.user })
	);
  const setToken = useTokenStore(state => state.setToken);
  const { types, setTypes } = useTypeStore(
    state => ({ types: state.types, setTypes: state.setTypes })
  );

  const handleLogOut = () => {
    logout()
    .then((response) => {
      if (response.status === 200) {
        loggedOut();
        setUser({});
        setToken('');
        enqueueSnackbar("Logout successful", {
					variant: 'warning',
					anchorOrigin: {
						vertical: theme.snackbar.position.vertical,
						horizontal: theme.snackbar.position.horizontal
					},
          autoHideDuration: 3000
				});
        navigate('/');
      }
      else {
        enqueueSnackbar(response.response.data.message, {
					variant: 'error',
					anchorOrigin: {
						vertical: theme.snackbar.position.vertical,
						horizontal: theme.snackbar.position.horizontal
					},
          autoHideDuration: 3000
				});
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const handleGetTypes = () => {
    getTypes().then((response) => {
      setTypes(response.data.data);
    });
  }

  useEffect(() => {
    handleGetTypes();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <StyledToolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ flexGrow: 1, alignSelf: 'center' }}
            >
              
            </Typography>

            <IconButton
              size="large"
              aria-label="display more actions"
              edge="end"
              color="inherit"
              onClick={handleSecondDrawerOpen}
            >
              <MoreIcon />
            </IconButton>
          </StyledToolbar>
        </AppBar>
      </Box>
      <SwipeableDrawer
        anchor='left'
        open={drawerOpen}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
        PaperProps={{
          sx: { width: 250, backgroundColor: theme.palette.background.default, height: '100vh' }
        }}
      >
        <Box>
          <List sx={{ backgroundColor: theme.palette.primary.main }}>
            <ListItem sx={{ justifyContent: 'space-between' }}>
              <Typography component='h5' sx={{ color: theme.palette.primary.text }}>{user.name}</Typography>
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon sx={{ color: theme.palette.primary.text }} />
              </IconButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              <Button
                fullWidth
                sx={{ color: theme.palette.primary.text, justifyContent: 'left' }}
                component={Link}
						    to="/dashboard"
                onClick={handleDrawerClose}
              >
                Dashboard
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                sx={{ color: theme.palette.primary.text, justifyContent: 'left' }}
                component={Link}
						    to="/transactions"
                onClick={handleDrawerClose}
              >
                Transactions
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                sx={{ color: theme.palette.primary.text, justifyContent: 'left' }}
                component={Link}
						    to="/settings"
                onClick={handleDrawerClose}
              >
                Settings
              </Button>
            </ListItem>
            <ListItem>
              <Button 
                variant='outlined' 
                color='secondary' 
                fullWidth
                onClick={handleLogOut}
              >
                Log Out
              </Button>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>

      <FilterDrawer 
        secondDrawerOpen={secondDrawerOpen} 
        handleSecondDrawerClose={handleSecondDrawerClose} 
        handleSecondDrawerOpen={handleSecondDrawerOpen}
      />
      
      <Grid 
        sx={{
          color: theme.palette.primary.text,
          px: {
            xs: 1,
            sm: 4
          },
          py: 1
        }}
      >
        <Outlet />
      </Grid>
    </>
  );
};

export default Layout;