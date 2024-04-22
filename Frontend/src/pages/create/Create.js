import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { create } from '../../services';

const Create = ({ onCreateTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title: title,
      description: description,
      status: false 
    };
    // onCreateTask(newTask);
    create(newTask);
    navigate("/");
  };


  return (
    <div>
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default Create;
