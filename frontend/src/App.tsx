// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OnboardingPage from './pages/OnboardingPage';
import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import TrackingPage from "./pages/TrackingPage";
import LoginSuccessPage from "./pages/LoginSuccessPage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<OnboardingPage />} />
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/tracking" element={<TrackingPage />} />
                <Route path="/post-login" element={<LoginSuccessPage />} />
            </Routes>
        </Router>
    );
};

export default App;
