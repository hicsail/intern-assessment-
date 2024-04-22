import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './pages/TaskList/TaskList';
import Navbar from './components/task/navbar/Navbar';
import Create from './pages/create/Create';
import CompletedList from './pages/TaskList/CompletedList';
import PendingList from './pages/TaskList/PendingList';


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<TaskList/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/completed" element={<CompletedList/>}/>
          <Route path="/pending" element={<PendingList/>} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
