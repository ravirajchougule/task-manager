

import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, deleteTask, toggleTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedDescription, setEditedDescription] = useState(task.description);

 
  const handleEdit = () => {
    if (isEditing) {
      if (editedText.trim()) {
        
        editTask(task.id, editedText, editedDescription);
      } else {
        alert("Task title cannot be empty.");
        return;
      }
    }
   
    setIsEditing(!isEditing);
  };

  
  let cardClass = 'task-card';
  if (task.priority) {
    cardClass += ' ' + task.priority.toLowerCase() + '-priority';
  }

 
  let titleClass = 'task-title';
  if (task.completed) {
    titleClass += ' completed';
  }

  
  let descClass = 'task-description';
  if (task.completed) {
    descClass += ' completed';
  }

  
  const formattedDeadline = new Date(task.deadline).toLocaleDateString('en-GB');

  return (
    <div className={cardClass}>
      <div className="task-card-header">
        <h3 className={titleClass}>{editedText}</h3>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.taskId)}
        />
      </div>

      <div className="task-card-body">
        {isEditing ? (
          <div>
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="edit-title"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="edit-description"
            />
          </div>
        ) : (
          <p className={descClass}>{task.description}</p>
        )}

        <div className="task-info">
          <span><strong>Priority:</strong> {task.priority}</span>
          <span><strong>Deadline:</strong> {formattedDeadline}</span>
        </div>
      </div>

      <div className="task-card-actions">
        <button onClick={handleEdit}>
          {isEditing ? 'Save' : 'Edit'}
        </button>

        <button onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;

