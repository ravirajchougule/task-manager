import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, deleteTask, toggleTask, editTask, isTableView }) => {
  if (isTableView) {
 
    return (
      <div className="task-table-container">
        <table className="task-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <tr key={task.id}>
                <td>{task.text}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td>{new Date(task.deadline).toLocaleDateString('en-GB')}</td>
                <td>{task.completed ? "Completed" : "Active"}</td>
                <td>
                  {/* <button onClick={() => toggleTask(task.id)}>
                    {task.completed ? "Undo" : "Done"}
                  </button> */}
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className='task-list'>
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
};

export default TaskList;


























































































































// import TaskItem from './TaskItem';
// import './TaskList.css'

// const TaskList = ({ tasks, deleteTask, toggleTask, editTask }) => {
//   return (
//     // <ul>
//     <div className='task-list'>
//       {tasks.map(task => (
//         <TaskItem 
//           key={task.id}
//           task={task}
//           deleteTask={deleteTask}
//           toggleTask={toggleTask}
//           editTask={editTask}
//         />
//       ))}
//     </div>
//     // </ul>
//   );
// };

// export default TaskList;
