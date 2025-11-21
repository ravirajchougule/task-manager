// components/Sidebar.jsx
import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>🏠 Dashboard</li>
        <li>📝 Tasks</li>
        <li>📊 Statistics</li>
        <li>⚙️ Settings</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
