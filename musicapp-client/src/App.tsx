import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AdminRoute from './components/AdminRoute/AdminRoute.tsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.tsx';
import Home from './pages/Home/Home.tsx';
import Login from './pages/Login/Login.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';

const App: React.FC = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route
						path="/home"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/secret"
						element={
							<AdminRoute>
								<h1>Hello admin! Shhhhh this is a secret...</h1>
							</AdminRoute>
						}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
