import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import PrivateRoutes from '../routes/PrivateRoutes';
import Transactions from '../pages/Transactions';

const LandingRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
			<Route element={<PrivateRoutes />}>
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/transactions" element={<Transactions />} />
			</Route>
		</Routes>
	);
};

export default LandingRoutes;