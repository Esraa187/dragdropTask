import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TaskProvider } from './context/TaskContext.jsx';


createRoot(document.getElementById('root')).render(

    <TaskProvider>
      <App />
    </TaskProvider>
  
)