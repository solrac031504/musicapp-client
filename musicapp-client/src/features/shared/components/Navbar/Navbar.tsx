import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar: React.FC = () => {
	return (
		<header className={styles.navbar}>
			<NavLink to="/home" className={styles.brand}>
				MusicManagement<span>Hub</span>
			</NavLink>
			<nav className={styles.nav}>
				<NavLink
					to="/home"
					className={({ isActive }) => `${styles.navLink}${isActive ? ` ${styles.active}` : ""}`}
				>
					Home
				</NavLink>
				<NavLink
					to="/genres"
					className={({ isActive }) => `${styles.navLink}${isActive ? ` ${styles.active}` : ""}`}
				>
					Genres
				</NavLink>
			</nav>
		</header>
	);
};

export default Navbar;
