import React, { useState } from 'react';
import { Button, Grid, Paper, TextField, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { register } from '../api'

const Signup = () => {
	const theme = useTheme();
	const styles = {
		root: {
			height: "100vh",
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

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password_confirmation, setPasswordConfirmation] = useState("");

	const [errors, setErrors] = useState({});

	const handleSubmit = (event) => {
		event.preventDefault();
		
		register({
			name,
			email,
			username,
			password,
			password_confirmation
		}).then((response) => {
			if (response.status === 201) {
				enqueueSnackbar(response.data.message, {
					variant: 'success',
					anchorOrigin: {
						vertical: theme.snackbar.position.vertical,
						horizontal: theme.snackbar.position.horizontal
					},
					autoHideDuration: 3000
				});
				navigate('/');
			}
			else {
				setErrors(response.response.data.errors);
			}
		}).catch((error) => {
			console.log(error);
		});
	}

	return (
		<Grid container component="main"  sx={styles.root}>
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
				<Typography variant="h5" sx={{ color: theme.palette.text.secondary }}>
					Register
				</Typography>
				<form onSubmit={handleSubmit}>
          <TextField 
						variant='outlined'
						fullWidth
						margin="normal"
            label="Name"
						onChange={(e) => setName(e.target.value)}
						error={errors.name && true}
						helperText={errors.name && errors.name[0]}
						sx={{
							input: {
								color: theme.palette.text.secondary
							}
						}}
					/>
          <TextField 
						variant='outlined'
						fullWidth
						margin="normal"
            label="Email"
						onChange={(e) => setEmail(e.target.value)}
						error={errors.email && true}
						helperText={errors.email && errors.email[0]}
						sx={{
							input: {
								color: theme.palette.text.secondary
							}
						}}
					/>
					<TextField 
						variant='outlined'
						fullWidth
						margin="normal"
            label="Username"
						onChange={(e) => setUsername(e.target.value)}
						error={errors.username && true}
						helperText={errors.username && errors.username[0]}
						sx={{
							input: {
								color: theme.palette.text.secondary
							}
						}}
					/>
					<TextField 
						type="password"
						variant='outlined'
						fullWidth
						margin="normal"
            label="Password"
						onChange={(e) => setPassword(e.target.value)}
						error={errors.password && true}
						helperText={errors.password && errors.password[0]}
						sx={{
							input: {
								color: theme.palette.text.secondary
							}
						}}
					/>
          <TextField 
						type="password"
						variant='outlined'
						fullWidth
						margin="normal"
            label="Re-type Password"
						onChange={(e) => setPasswordConfirmation(e.target.value)}
						error={errors.password_confirmation && true}
						helperText={errors.password_confirmation && errors.password_confirmation[0]}
						sx={{
							input: {
								color: theme.palette.text.secondary
							}
						}}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						sx={styles.buttons}
					>
						Submit
					</Button>
          <hr />
					<Button
						fullWidth
						variant="contained"
						color="secondary"
						sx={styles.buttons}
            component={Link}
						to="/login"
					>
						Back to login
					</Button>
				</form>
			</Grid>
		</Grid>
	);
};

export default Signup;