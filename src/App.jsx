import React, { useEffect, useState,useContext } from 'react';
import './App.css';
import BacklogTasks from './components/BacklogTasks';
import PendingTasks from './components/PendingTasks';
import TodoTasks from './components/TodoTasks';
import DoingTasks from './components/DoingTasks';
import DoneTasks from './components/DoneTasks';

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import SideBar from './components/SideBar';
import { TaskContext } from './context/TaskContext';
import Navbar from './components/Navbar';



function App() {
  const { isExpanded } = useContext(TaskContext)
  return (

    <>
      <DndProvider backend={HTML5Backend}>
        <Navbar/>
        <div className='app'>
          <SideBar/>
          <div className={`any grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 ${isExpanded ? "cc" : "cgcg"}`}>
            <BacklogTasks />
            <PendingTasks />
            <TodoTasks />
            <DoingTasks />
            <DoneTasks />
          </div>
        </div>
      </DndProvider>

    </>
  );
}

export default App;
