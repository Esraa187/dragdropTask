// Sidebar.js
import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCog } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import { TaskContext } from '../context/TaskContext';

const SideBar = () => {
  const { isExpanded, toggleSidebar } = useContext(TaskContext)

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button onClick={toggleSidebar} className="toggle-button text-2xl"><i className="fa-solid fa-bars text-2xl"></i>  {isExpanded && <span> MT App</span> } </button>
      <div className="menu-items w-full">
        <a className="menu-item focus w-full">
        <i className="fa-solid fa-house-chimney text-xl "></i> {isExpanded && <span>Home</span>}
        </a>
        <a className="menu-item">
        <i className="fa-solid fa-cubes text-xl"></i> {isExpanded && <span>Boards</span>}
        </a>
        <a className="menu-item">
        <i className="fa-solid fa-gears text-xl"></i> {isExpanded && <span>Settings</span>}
        </a>
      </div>
    </div>
  );
};

export default SideBar;

