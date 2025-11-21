// import React, { useState } from 'react';

// const TaskForm = ({ addTask }) => {
//   const [text, setText] = useState('');
//   const [deadline, setDeadline] = useState("");


//   const handleDeadlineChange = (e) =>{
//     setDeadline(e.target.value);
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault();
//      //for checking if input is empty Or not

//     if (text.trim() === '' || deadline === " ") {
//         alert("Please enter a task And select a valid deadline.");
//         return;
//       }else{
//       addTask(text);
//       setText('');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input 
//         type="text"
//         value={text}
//         placeholder="Add new task"
//         onChange={e => setText(e.target.value)}
//         // placeholder="Add new task"
//       />
//       <input
//         type='date'
//         id = 'deadline'
//         value={deadline}
//         placeholder='Enter Deadline'
//         onchange={handleDeadlineChange}
      
      
//       />
//       <button type="submit">Add</button>
//     </form>
//   );
// };

// export default TaskForm;
