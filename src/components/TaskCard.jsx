// TaskCard.js
import React, { useContext } from 'react';
import { useDrag } from 'react-dnd';
import { TaskContext } from '../context/TaskContext';

function TaskCard({ task }) {
  const { markAsDone } = useContext(TaskContext);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }))
  console.log(isDragging)
  return (
    <div ref={drag} className='w-full border rounded  my-4 pt-3 cursor-pointer bg-white'>
      {task.src && <img src={task.src} alt={task.title} className='w-full h-32 object-cover rounded p-1' />}

     <div className='ps-3 my-3'>
     {Array.isArray(task.tag) && task.tag.map((tag, index) => (
        <span key={index} style={{ backgroundColor: tag.color + "3d", color: tag.color }} className="inline-block px-2  mr-2 rounded text-sm">
          {tag.name}
        </span>
      ))}

     </div>
      <h4 className='ps-3 text-lg my-0'>{task.title}</h4>
      <p className='text-gray-500 ps-3 text-sm my-0'>{task.description}</p>
      <hr className='ps-0' />
      <div className='grid grid-cols-2'>
        <p className='text-gray-600 ps-3 text-sm'>
          <i className="fa-regular fa-clock"></i> {task.time} mins
        </p>
        {task.priority === 'Low' ?
          <p className="ps-2 py-1 font-medium me-2 rounded text-lime-600 bg-lime-100" style={{fontSize:"12px"}} ><i className="fa-regular fa-circle-dot"></i> Low</p> :
          task.priority === 'Medium' ?
            <p className="ps-2 py-1 font-medium me-2 rounded text-orange-500 bg-orange-200"style={{fontSize:"12px"}} ><i className="fa-regular fa-circle-dot"></i> Medium</p> :
            <p className="ps-2 py-1 font-medium me-2 rounded  text-red-600 bg-rose-200"style={{fontSize:"12px"}} ><i className="fa-regular fa-circle-dot"></i> High</p>}

      </div>
      {/* {task.type !== "done" && (
        <button onClick={() => markAsDone(task.id)} className="complete-btn">
          Complete
        </button>
      )} */}
      {/* <div className='ps-3 flex justify-end'>
        <button  className='text-blue-500 mr-2'>Edit</button>
        <button  className='text-red-500'>Delete</button>
      </div> */}
      
    </div>
  );
}

export default TaskCard;


