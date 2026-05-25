import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // Import as styles object

// Types for API response
interface LoginResponse {
    authenticated: boolean;
    loginExpiration?: Date;
    admin?: boolean;
    error?: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    
    const baseUrl = "http://localhost:5000"
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        // ... your existing handleSubmit logic remains exactly the same ...
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