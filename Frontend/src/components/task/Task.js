import React, { useState, useEffect } from 'react';
import './Task.css';
import { updateTaskTitle } from '../../services';

const Task = ({ id, title, description, onDelete, status, onComplete }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  useEffect(() => {
    setEditedTitle(editedName);
    setEditedDescription(editedDescription);
  }, [editedName, editedDescription]);

  const handleEdit = () => {
    if (!status) {
      setEditMode(true);
    }
  };

  const handleSave = () => {
    console.log('Edited Name:', editedName);
    console.log('Edited Description:', editedDescription);
    const updatedTask = {
      id:id,
      title: editedName,
      description: editedDescription,
      status: false 
    };
    updateTaskTitle(id,updatedTask);
    setEditMode(false);
  };
  
  const handleDelete = () => {
    onDelete(id);
  };

  const handleComplete = () => {
    onComplete(id);
  };

  const getStatusDisplay = (status) => {
    return status ? "Completed" : "Pending";
  };

  return (
    <div className="task-container">
      {editMode ? (
        <div className="edit-mode">
          <input
            className="edit-input"
            type="text"
            value={editedName}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
           <p>{description}</p>
          <button className="save-button" onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{editedName}</h3>
          <p>{description}</p>
          <p>Status: {getStatusDisplay(status)}</p>
          <button className={`edit-button ${status ? 'edit-button-disabled' : ''}`} onClick={handleEdit}>Edit</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
          {!status  && (
            <button className="complete-button" onClick={handleComplete}>Complete</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Task;
