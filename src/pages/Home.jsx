import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthForms from '../components/auth/AuthForms';
import Button from '../components/common/Button';

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleDashboardNavigation = () => {
        navigate('/dashboard');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {user ? (
                <div className="bg-white p-8 rounded shadow-md w-96 text-center">
                    <h2 className="text-2xl font-bold mb-4">Welcome, {user.name}!</h2>
                    <p className="text-gray-700 mb-4">Ready to track your fitness goals?</p>
                   <Button onClick={handleDashboardNavigation} className="w-full">Go to Dashboard</Button>
                </div>
            ) : (
               <AuthForms />
            )}
        </div>
    );
};

export default Home;