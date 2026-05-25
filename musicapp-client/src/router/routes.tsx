import { Route, Routes } from 'react-router-dom';
import { AdminRoute, Login, ProtectedRoute } from '../features/auth/index.ts';
import Home from '../features/auth/pages/Home/Home.tsx';
import NotFound from '../features/auth/pages/NotFound/NotFound.tsx';

const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/secret" element={<AdminRoute><h1>Secret</h1></AdminRoute>} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;