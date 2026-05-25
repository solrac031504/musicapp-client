import { Route, Routes } from "react-router-dom";
import { AdminRoute, Login, ProtectedRoute } from "../features/auth/index.ts";
import { Genre, GenreList } from "../features/genres/index.ts";
import { Home, NotFound } from "../features/shared/index.ts";

const AppRoutes = () => (
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
			path="/genres"
			element={
				<ProtectedRoute>
					<GenreList />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/genre/:id"
			element={
				<ProtectedRoute>
					<Genre />
				</ProtectedRoute>
			}
		/>
		<Route
			path="/secret"
			element={
				<AdminRoute>
					<h1>Secret</h1>
				</AdminRoute>
			}
		/>
		<Route path="*" element={<NotFound />} />
	</Routes>
);

export default AppRoutes;
