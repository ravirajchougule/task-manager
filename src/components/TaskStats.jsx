
import React from 'react';
import './TaskStats.css';

const TaskStats = ({ tasks }) => {
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(task => task.completed).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const pendingTasks = tasks.filter(
    task => !task.completed && new Date(task.deadline) < today
  ).length;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="task-stats">
      <h2>📊 Task Statistics</h2>
      <div className="stats-box">
        <div>
          <h4>Total Tasks</h4>
          <p>{totalTasks}</p>
        </div>
        <div>
          <h4>Completed</h4>
          <p>{completedTasks}</p>
        </div>
        <div>
          <h4>Pending</h4>
          <p>{pendingTasks}</p>
        </div>
        <div>
          <h4>Completion Rate</h4>
          <p>{completionRate}%</p>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
