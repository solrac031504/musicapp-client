import "bootstrap/dist/css/bootstrap.min.css";
import { FC } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Navbar } from "./features/shared/index.ts";
import AppRoutes from "./router/routes.tsx";

const LOGIN_PATH = "/";

const Layout: FC = () => {
	const location = useLocation();
	const showNavbar = location.pathname !== LOGIN_PATH;

	return (
		<>
			{showNavbar && <Navbar />}
			<AppRoutes />
		</>
	);
};

const App: FC = () => (
	<div className="App">
		<BrowserRouter>
			<Layout />
		</BrowserRouter>
	</div>
);

export default App;
