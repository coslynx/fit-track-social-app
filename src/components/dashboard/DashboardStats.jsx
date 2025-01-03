import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import api from '../../services/api';
import PropTypes from 'prop-types';

interface GoalSummary {
    totalGoals: number;
    completedGoals: number;
    progressPercentage: number;
}

const DashboardStats: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState<GoalSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                const response = await api.get<GoalSummary>('/goals/summary');
                setStats(response);
                setError(null);
            } catch (err: any) {
                console.error('Failed to fetch goal summary:', err);
                setError(err.message || 'Failed to fetch goal summary');
                setStats(null)
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [user]);


    if (!user) {
        return <div className="text-center">Not logged in</div>;
    }

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }
    
    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }
    
    return (
        <div className="bg-white p-4 rounded shadow-md w-full max-w-md text-center">
            <div className="mb-2">
                <span className="block text-gray-700 text-sm font-bold">Total Goals:</span>
                <span className="text-xl font-semibold text-blue-500">{stats?.totalGoals !== undefined ? stats.totalGoals : 'N/A'}</span>
            </div>
            <div className="mb-2">
                <span className="block text-gray-700 text-sm font-bold">Completed Goals:</span>
                <span className="text-xl font-semibold text-blue-500">{stats?.completedGoals !== undefined ? stats.completedGoals : 'N/A'}</span>
            </div>
            <div>
                <span className="block text-gray-700 text-sm font-bold">Progress:</span>
                  <span className="text-xl font-semibold text-blue-500">
                       {stats?.progressPercentage !== undefined ? `${stats.progressPercentage}%` : 'N/A'}
                    </span>
            </div>
        </div>
    );
};

DashboardStats.propTypes = {
    // No props expected
};

export default DashboardStats;