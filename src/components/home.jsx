
import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import './home.css';
import FilterDropdown from './FilterDropdown';
import TaskStats from './TaskStats';
import Topbar from './Topbar';
import TodaysTasks from './TodaysTasks';
import { cloudioService } from './api';

const Home = ({ onLogout }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [priority, setPriority] = useState('');
    const [filter, setFilter] = useState('all');

    const [isTableView, setIsTableView] = useState(
        localStorage.getItem('hellokey') === 'true'
    );

    useEffect(() => {
        localStorage.setItem('hellokey', isTableView);
    }, [isTableView]);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        setLoading(true);
        try {
            const tasksFromCloud = await cloudioService.getTasks(); 

            setTasks(tasksFromCloud);  

        } catch (error) {
            console.error("Error loading tasks:", error);
            alert("Failed to load tasks from cloud");
        } finally {
            setLoading(false);
        }
    };



    const addTask = async () => {
        const trimmedTitle = taskTitle.trim();

        if (!trimmedTitle || !deadline) {
            alert('Please enter a task title and select a valid deadline.');
            return;
        }

        if (!priority) {
            alert('Please select a priority level.');
            return;
        }

        const selectedDate = new Date(deadline);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        if (selectedDate <= currentDate) {
            alert('Please select a future date for the deadline.');
            return;
        }

        try {
            await cloudioService.createTask({
                text: trimmedTitle,
                description: taskDescription,
                deadline,
                priority,
                completed: false,
            });

            // fething the all tasks after adding so no need refresh everyTime.
            await loadTasks();

            setTaskTitle('');
            setTaskDescription('');
            setDeadline('');
            setPriority('');
            setShowForm(false);

        } catch (error) {
            console.error('Error creating task:', error);
            alert('Failed to create task in cloud');
        }
    };



    const editTask = async (id, newText, newDescription) => {
        try {
            await cloudioService.updateTask(id, {
                text: newText,
                description: newDescription
            });

            
            await loadTasks();
        } catch (error) {
            alert('Failed to update task in cloud');
        }
    };


    const toggleTask = async (taskId) => {
        try {
            await cloudioService.toggleTaskCompletion(taskId);
            await loadTasks();
        } catch (error) {
            alert("Failed to update task in cloud");
        }
    };



    const deleteTask = async (id) => {
        if (!window.confirm('Are you sure you want to delete this task?')) return;

        try {
            await cloudioService.deleteTask(id);
            await loadTasks();
        } catch (error) {
            alert('Failed to delete task from cloud');
        }
    };


    const handleDeleteAll = async () => {
        if (!window.confirm('Are you sure you want to delete all tasks?')) return;

        try {
            for (const task of tasks) {
                await cloudioService.deleteTask(task.id);
            }
            setTasks([]);
        } catch (error) {
            alert('Failed to delete all tasks from cloud');
        }
    };

    const filteredTasks = tasks.filter((task) => {
        const stripTime = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const today = stripTime(new Date());
        const taskDeadline = stripTime(new Date(task.deadline));
        const isPending = !task.completed && taskDeadline < today;

        if (filter === 'pending') return isPending;
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const resetForm = () => {
        setShowForm(false);
        setTaskTitle('');
        setTaskDescription('');
        setDeadline('');
        setPriority('');
    };

    return (
        <>
            <Topbar out={onLogout} />
            <div className="App">
                {loading && <div className="loading">Loading...</div>}

                <button className="new-task" onClick={() => setShowForm(true)}>
                    Add New Task
                </button>

                {showForm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h2>Create New Task</h2>

                            <input
                                type="text"
                                value={taskTitle}
                                placeholder="Task Title"
                                onChange={(e) => setTaskTitle(e.target.value)}
                            />

                            <textarea
                                value={taskDescription}
                                placeholder="Task Description"
                                onChange={(e) => setTaskDescription(e.target.value)}
                            />

                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                            />

                            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                                <option value="" disabled hidden>Select priority</option>
                                <option value="Top">Top Priority</option>
                                <option value="Medium">Medium Priority</option>
                                <option value="Low">Low Priority</option>
                            </select>

                            <div className="modal-buttons">
                                <button onClick={addTask}>Save Task</button>
                                <button onClick={resetForm} className="cancel-button">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <FilterDropdown filter={filter} setFilter={setFilter} />
                <TodaysTasks tasks={tasks} />

                <button className="table" onClick={() => setIsTableView(!isTableView)}>
                    {isTableView ? 'Switch to Grid View' : 'Switch to Table View'}
                </button>

                <TaskList
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                    editTask={editTask}
                    isTableView={isTableView}
                />

                <TaskStats tasks={tasks} />

                {tasks.length > 0 && (
                    <button className="delete-all-button" onClick={handleDeleteAll}>
                        Delete All Tasks
                    </button>
                )}
            </div>
        </>
    );
};

export default Home;
