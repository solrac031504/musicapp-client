import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/authentication/authentication.ts';

const REDIRECT_SECONDS = 10;

const NotFound: React.FC = () => {
	const navigate = useNavigate();
	const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

	useEffect(() => {
		const timerId = setTimeout(() => navigate('/home'), REDIRECT_SECONDS * 1000);
		return () => clearTimeout(timerId);
	}, [navigate]);

	useEffect(() => {
		if (secondsLeft <= 0) return;
		const intervalId = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
		return () => clearInterval(intervalId);
	}, [secondsLeft]);

	if (!isAuthenticated()) {
		return <Navigate to="/" replace />;
	}

	return (
		<div className="not-found-container">
			<h1>404 - Page Not Found</h1>
			<p>The page you&apos;re looking for doesn&apos;t exist.</p>
			<p>You will be redirected to the home page in {secondsLeft} seconds...</p>
		</div>
	);
};

export default NotFound;
