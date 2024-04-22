import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">All Tasks</Link>
        </li>
        <li className="nav-item">
          <Link to="/create" className="nav-link">Create Task</Link>
        </li>
        <li className="nav-item">
          <Link to="/completed" className="nav-link">Completed Tasks</Link>
        </li>
        <li className="nav-item">
          <Link to="/pending" className="nav-link">Pending Tasks</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
