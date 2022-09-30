import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { AppBar, Box, Button, Divider, IconButton, List, ListItem, styled, SwipeableDrawer, Toolbar, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { logout } from '../api';

import { useLogInStore } from '../stores/AuthenticateStore';
import { useTokenStore } from '../stores/AuthenticateStore';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1)
}));

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { loggedOut, setUser, user } = useLogInStore(
		state => ({ loggedOut: state.loggedOut, setUser: state.setUser, user: state.user })
	);
  const setToken = useTokenStore(state => state.setToken);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  }

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
						vertical: 'top',
						horizontal: 'center'
					},
          autoHideDuration: 3000
				});
        navigate('/');
      }
      else {
        enqueueSnackbar(response.response.data.message, {
					variant: 'error',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center'
					},
          autoHideDuration: 3000
				});
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

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
              Dashboard
            </Typography>

            <IconButton
              size="large"
              aria-label="display more actions"
              edge="end"
              color="inherit"
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
              >
                Dashboard
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                sx={{ color: theme.palette.primary.text, justifyContent: 'left' }}
              >
                Transactions
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                sx={{ color: theme.palette.primary.text, justifyContent: 'left' }}
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
    </>
  );
};

export default Dashboard;