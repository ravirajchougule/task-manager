// components/Topbar.jsx
import React from 'react';
import './Topbar.css';
import { FaGoogle, FaCog } from 'react-icons/fa';  // uses react-icons

const Topbar = ({out}) => {


  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2>Task Manager</h2>
      </div>
      <div className="topbar-right">
        <FaGoogle className="topbar-icon" onClick={out} />
        <FaCog className="topbar-icon" />
      </div>
    </header>
  );
};

export default Topbar;
