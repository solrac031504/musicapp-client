import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiRequest } from "../../../../services/api.client.ts";
import { LoginRequest, LoginResponse } from "../../types/Login.types.ts";
import styles from './Login.module.css';

const Login: React.FC = () => {
	const navigate = useNavigate();

	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		setLoading(true);
		setError('');

		// const req: LoginRequest = {
		// 	item: { username, password },
		// };

		const req = {
			item: {
				username,
				password
			}
		} as LoginRequest;

		try {
			const result = await apiRequest<LoginResponse>('/login', {
				method: 'POST',
				body: req
			});

			if (result.item.isAuthenticated) {
				const loginExpiration = new Date(result.item.authExpiration!);

				sessionStorage.setItem('user', username);
				sessionStorage.setItem('loginExpiration', loginExpiration.toISOString());
				sessionStorage.setItem('isAdmin', result.item.isAdmin.toString());

				navigate('/home');
			} else {
				setError(result.item.errorMessage ?? 'Invalid credentials');
			}
		} catch (err) {
			console.error('Login error:', err);
			setError(err instanceof Error ? err.message : 'Login failed. Please try again');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginCard}>
				<div className={styles.loginHeader}>
					<h2>Welcome to Music App</h2>
					<p>Sign in to your account</p>
				</div>

				{error && <div className={styles.errorMessage}>{error}</div>}

				<form className={styles.loginForm} onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<label htmlFor="username">Username</label>
						<input
							id="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Enter username"
							required
							disabled={loading}
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor="password">Password</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter password"
							required
							disabled={loading}
						/>
					</div>

					<button type="submit" className={styles.loginButton} disabled={loading}>
						{loading ? (
							<>
								<span className={styles.loading} />
								Logging in...
							</>
						) : (
							'Log In'
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
