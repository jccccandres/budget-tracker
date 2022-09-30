import React, { useEffect, useState } from 'react';
import { Button, Grid, Paper, TextField, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api'
import { useSnackbar } from 'notistack';
import { useLogInStore, useTokenStore } from '../stores/AuthenticateStore';

const Login = () => {
	const theme = useTheme();
	const styles = {
		root: {
			height: "100vh",
			backgroundColor: theme.palette.grey[900],
    	alignItems: "center",
    	justifyContent: "center"
		},
		card: {
			padding: theme.spacing(4, 2),
			textAlign: "center"
		},
		buttons: {
			margin: "8px 0"
		}
	}

	const { enqueueSnackbar } = useSnackbar();
	const navigate = useNavigate();

	// stores
	const { isLoggedIn, loggedIn } = useLogInStore(
		state => ({ loggedIn: state.loggedIn, isLoggedIn: state.isLoggedIn })
	);

	const { setUser } = useLogInStore(
		state => ({ setUser: state.setUser })
	);

	const { setToken } = useTokenStore(
		state => ({ setToken: state.setToken })
	);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		login({
			username,
			password
		}).then((response) => {
			if (response.status === 200) {
				loggedIn();
				setToken(response.data.token);
				setUser(response.data.data);
				enqueueSnackbar("Login successful", {
					variant: 'success',
					anchorOrigin: {
						vertical: 'top',
						horizontal: 'center'
					},
					autoHideDuration: 3000
				});
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
		}).catch((error) => {
			console.log(error);
		});
	}

	useEffect(() => {
		if (isLoggedIn) {
			navigate('/dashboard');
		}
	}, [isLoggedIn, navigate]);

	return (
		<Grid container component="main" sx={styles.root}>
			<Grid 
				item
				elevation={1}
				component={Paper}
				sx={styles.card}
				xs={12}
        sm={6}
        md={4}
				lg={3}
			>
				<Typography variant="h5">
					Sign In
				</Typography>
				<form onSubmit={handleSubmit}>
					<TextField 
						variant='outlined'
						fullWidth
						margin="normal"
            label="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
            autoFocus
					/>
					<TextField 
						variant='outlined'
						fullWidth
						margin="normal"
            label="Password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						sx={styles.buttons}
					>
						Sign In
					</Button>
					<hr />
					<Button
						fullWidth
						variant="contained"
						color="secondary"
						sx={styles.buttons}
						component={Link}
						to="/signup"
					>
						Register
					</Button>
				</form>
			</Grid>

		</Grid>
	);
};

export default Login;