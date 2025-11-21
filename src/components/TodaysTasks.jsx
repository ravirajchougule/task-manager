
import React from 'react';
import './TodaysTasks.css';

const TodaysTasks = ({ tasks }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to midnight

  const todaysTasks = tasks.filter(task => {
    const taskDate = new Date(task.deadline);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === today.getTime();
  });

  const completed = todaysTasks.filter(task => task.completed).length;
  const remaining = todaysTasks.length - completed;

  return (
    <div className="todays-tasks-box">
      <h3>Today's Tasks</h3>
      <div className="task-summary">
        <div><strong>Total:</strong> {todaysTasks.length}</div>
        <div><strong>Completed:</strong> {completed}</div>
        <div><strong>Remaining:</strong> {remaining}</div>
      </div>
    </div>
  );
};

export default TodaysTasks;
