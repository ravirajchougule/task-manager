import TaskItem from './TaskItem';
import './TaskList.css'

const TaskList = ({ tasks, deleteTask, toggleTask, editTask }) => {
  return (
    <ul>
      {tasks.map(task => (
        <TaskItem 
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
