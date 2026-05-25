import React from "react";

const Home: React.FC = () => {
	const user = sessionStorage.getItem("user");

	return (
		<div className="home-container">
			<main className="container mt-4">
				<h1>Welcome, {user}!</h1>
				<p>Placeholder for rest of stuff :)</p>
			</main>
		</div>
	);
};

export default Home;
