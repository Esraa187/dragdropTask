import React, { useState, useContext } from 'react'
import AddTask from './AddTask'
import TaskCard from './TaskCard';
import { TaskContext } from '../context/TaskContext';
import { useDrop } from 'react-dnd';

function PendingTasks() {
  const { tasks, addTask, updateTaskType } = useContext(TaskContext)
  const [modalShow, setModalShow] = useState(false);
  const pendingTasks = tasks.filter(task => task.type === "pending");
  const addItemToNewType = (id) => {
    updateTaskType(id, "pending")
  }
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToNewType(item.id),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <div ref={drop} className={`z-2 ${isOver ? "bg-gray-200" : ""}`}>
      <p className='task-title'>Pending</p>
      {pendingTasks.map((pendingtask, i) => <TaskCard key={i} task={pendingtask} />)}
      <button className=' add w-full bg-black text-white mt-6 py-2 rounded transition duration-200 ' onClick={() => setModalShow(true)}><i className="fa-solid fa-plus"></i> Add Task</button>
      <AddTask show={modalShow} onHide={() => setModalShow(false)} addTask={addTask} type={"pending"} />
    </div>
  )
}

export default PendingTasks
