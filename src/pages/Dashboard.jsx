import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DashboardStats from '../components/dashboard/DashboardStats';
import GoalItem from '../components/goals/GoalItem';
import api from '../services/api';

interface Goal {
    id: string;
    title: string;
    completed: boolean;
}

const Dashboard: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        const fetchGoals = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get<Goal[]>('/goals');
                setGoals(response);
            } catch (err: any) {
                console.error('Failed to fetch goals:', err);
                setError(err.message || 'Failed to fetch goals');
                setGoals([]);
            } finally {
                setLoading(false);
            }
        };

        fetchGoals();
    }, [user, navigate]);

    const handleGoalUpdated = () => {
        const fetchGoals = async () => {
            setLoading(true);
            setError(null);
             try {
                 const response = await api.get<Goal[]>('/goals');
                 setGoals(response);
            } catch (err: any) {
                 console.error('Failed to fetch goals:', err);
                 setError(err.message || 'Failed to fetch goals');
                 setGoals([]);
            } finally {
                 setLoading(false);
             }
        };
        fetchGoals();
    };


    if (!user) {
         return null;
    }
    
    return (
        <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
            <h2 className="text-2xl font-bold text-center mb-6">Your Dashboard</h2>
             <DashboardStats />
            {loading && <div className="text-center">Loading goals...</div>}
             {error && <div className="text-red-500 text-center">{error}</div>}
            {goals.length > 0 ? (
               <div className="w-full max-w-md">
                {goals.map(goal => (
                  <GoalItem
                    key={goal.id}
                    id={goal.id}
                    title={goal.title}
                    completed={goal.completed}
                    onGoalUpdated={handleGoalUpdated}
                    />
                    ))}
                    </div>
            ) : ( !loading && !error &&
                <div className="text-center">No goals yet!</div>
             )}
        </div>
    );
};

export default Dashboard;