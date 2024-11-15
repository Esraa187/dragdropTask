
import React, { createContext, useState } from 'react';


export const TaskContext = createContext();


export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const updateTaskType = (id, newType) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map((task) =>
                task.id === id ? { ...task, type: newType } : task
            );
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };
    const markAsDone = (id) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map((task) =>
                task.id === id ? { ...task, type: "done" } : task
            );
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };

    const addTask = (newTask) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks, newTask];
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            return updatedTasks;
        });
    };
    const calculateProgress = () => {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.type === "done").length;
        return totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
      };
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => setIsExpanded(!isExpanded);

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTaskType, isExpanded, toggleSidebar,markAsDone,calculateProgress }}>
            {children}
        </TaskContext.Provider>
    );
}