import React, { useState } from 'react';
import api from '../../services/api';
import PropTypes from 'prop-types';
import Button from '../common/Button';

interface GoalItemProps {
  id: string;
  title: string;
  completed: boolean;
  onGoalUpdated: () => void;
}

const GoalItem: React.FC<GoalItemProps> = ({
    id,
    title,
    completed: initialCompleted,
    onGoalUpdated,
  }) => {
  const [completed, setCompleted] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
        const newCompletedStatus = !completed;
        setCompleted(newCompletedStatus);
        await api.put(`/goals/${id}`, { completed: newCompletedStatus });
        onGoalUpdated();
      } catch (error: any) {
        console.error('Failed to update goal status:', error);
        setCompleted(!completed);
      } finally {
        setLoading(false);
      }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md flex items-center justify-between mb-2">
      <span className="flex-grow mr-2 font-semibold">
        {title}
      </span>
        <span className={completed ? "text-green-500" : "text-red-500"}>
            {completed ? 'Complete' : 'Incomplete'}
        </span>
      <Button
        onClick={handleToggle}
        disabled={loading}
      >
         {completed ? 'Mark Incomplete' : 'Mark Complete'}
      </Button>
    </div>
  );
};

GoalItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  onGoalUpdated: PropTypes.func.isRequired,
};

export default GoalItem;