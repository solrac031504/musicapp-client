import React from 'react';

const Home: React.FC = () => {
	const user = sessionStorage.getItem('user');

	return (
		<div className="home-container">
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<div className="container-fluid">
					<span className="navbar-brand">Music App</span>
				</div>
			</nav>

			<main className="container mt-4">
				<h1>Welcome, {user}!</h1>
				<p>Placeholder for rest of stuff :)</p>
			</main>
		</div>
	);
};

export default Home;
