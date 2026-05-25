import 'bootstrap/dist/css/bootstrap.min.css';
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './router/routes.tsx';

const App: FC = () => (
    <div className="App">
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    </div>
);

export default App;