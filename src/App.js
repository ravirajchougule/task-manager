import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterDropdown from './components/FilterDropdown';
import './App.css';


const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); //declaring 'all' initially bcoz it will show all taska 
  // all,active,completed

 const addTask = (text) => {
  const trimmedText = text.trim();

  // if record is alredy present it is going to show you alert message
  // by using toLowerCase it become case sensetive
  const isDuplicate = tasks.some(
    task => task.text.trim().toLowerCase() === trimmedText.toLowerCase()
  );

  if (isDuplicate) {
    alert("Task already exists!");
    return;
  }

  const newTask = {
    id: Date.now(),
    text: trimmedText,
    completed: false,
  };

  setTasks([...tasks, newTask]);
};



  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

 

  const toggleTask = (id) => {
    setTasks(
        tasks.map(task => {
          if (task.id === id) {
            return { ...task, completed: !task.completed };
          } else {
            return task;
          }
        })
    );
  };


  const editTask = (id, newText) => {
    setTasks(
      tasks.map(task =>{
        // task.id === id ? { ...task, text: newText } : task we can use ternary operator too
        if(task.id===id){
          return { ...task, text: newText };
        }
        else{
          return task;
        }
  })
    );
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div className="top-bar">
        <TaskForm addTask={addTask} />
        <FilterDropdown filter={filter} setFilter={setFilter} />
      </div>


      <TaskList 
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        editTask={editTask}
      />
    </div>
  );
};

export default App;
