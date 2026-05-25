import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // Import as styles object

// Types for API response
interface LoginResponse {
    item: {
        isAuthenticated: boolean;
        authExpiration: Date | null;
        isAdmin: boolean;
        errorMessage: string | null;
    }
}

interface LoginRequest {
    item: {
        username: string;
        password: string;
    }
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
    const baseUrl = "http://localhost:5000"
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(false);
        setError('');

        const req = {
            item: {
                username: username,
                password: password
            }
        } as LoginRequest;

        // Get login from api
        console.log(`Attempting to login user ${username}`);

        try {
            const res = await fetch(`${baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req)
            });

            if (!res.ok) throw new Error(`HTTP error: status ${res.status}`);

            const result: LoginResponse = await res.json();

            console.log(result);

            if (result.item.isAuthenticated) {
                const loginExpiration = new Date(result.item.authExpiration!);
                const isAdmin = result.item.isAdmin;

                // Save auth data
                sessionStorage.setItem('user', username);
                sessionStorage.setItem('loginExpiration', loginExpiration.toISOString());
                sessionStorage.setItem('isAdmin', isAdmin.toString());

                console.log(`user: ${username}`);
                console.log(`loginExpiration: ${loginExpiration.toISOString()}`);
                console.log(`isAdmin: ${isAdmin}`);

                navigate('/home');
            } else {
                setError(result.item.errorMessage || 'Invalid credentials');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err instanceof Error ? err.message : 'Login failed. Please try again');
        } finally {
            setLoading(false);
        }
    }
    
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                            disabled={loading}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className={styles.loginButton}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className={styles.loading}></span>
                                Logging in...
                            </>
                        ) : 'Log In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;