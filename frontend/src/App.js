import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Navigation from './components/shared/Navigation/Navigation';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Authenticate from './pages/Authenticate/Authenticate';

const isAuth = false;

function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                {/* Use GuestRoute as a wrapper */}
                <Route 
                    path="/authenticate" 
                    element={
                        <GuestRoute>
                            <Authenticate />
                        </GuestRoute>
                    } 
                />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

// Corrected GuestRoute component
const GuestRoute = ({ children }) => {
    return isAuth ? (
        <Navigate to="/rooms" replace /> // Use Navigate without the need for pathname object
    ) : (
        children // Render children if not authenticated
    );
};

export default App;
