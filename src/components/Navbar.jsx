import React, { useContext } from 'react'
import './nav.css'
import { TaskContext } from '../context/TaskContext'
function Navbar() {
  const { calculateProgress } = useContext(TaskContext)
  const progress = calculateProgress();
  const getProgressEmoji = () => {
    if (progress === 0) return '😔'; 
    if (progress <= 25) return '😅'; 
    if (progress <= 50) return '😐'; 
    if (progress <= 75) return '🙂'; 
    if (progress < 100) return '😄';
    return '🎉';
  };
  return (
    <div style={{ marginLeft: "200px" }} className='my-3 grid grid-cols-3 align-middle' >
      <h5 className='bg-orange-500 border-2 rounded-full border-orange-500 w-fit py-2 px-2.5' ><i className="fa-regular fa-user text-white"></i></h5>
      <div className="search-wrapper">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search" />
      </div>
      <div className="progress-wrapper">
        <p className="text-gray-700 mb-2">Overall Progress: {calculateProgress()}%</p>
        <div className="progress-container " >
          <div className="progressbar " style={{ width: `${calculateProgress()}%` }}>
            <span className="progress-emoji">{getProgressEmoji()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
