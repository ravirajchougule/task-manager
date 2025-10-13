import React, { useState } from 'react';
import './TaskItem.css';

const TaskItem = ({ task, deleteTask, toggleTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false); //first we are declaring isEditing as false so it wii sho 'Edit' option on the taskitem
  const [editedText, setEditedText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing && editedText.trim()) {
      editTask(task.id, editedText);
    }
    setIsEditing(!isEditing); //false->true , true->false
  };

  return (
    <li>
      <input 
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
      />
      {isEditing ? (
        <input 
          type="text"
          value={editedText}
          onChange={e => setEditedText(e.target.value)}
        />
      ) : (
        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          {task.text}
        </span>
      )}
      {/* we alredy declare isEditing as false hence first it shows edit button after editing is done then again 
      We will declare as true so it will show us save button*/}
      <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>  
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </li>
  );
};

export default TaskItem;
