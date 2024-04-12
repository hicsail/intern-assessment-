import { useState } from "react";
import { Button, Input } from "antd";

const ToDoItem = ({ title, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    onUpdate(title, updatedTitle);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(title);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "8px",
        marginBottom: "8px",
        display: "flex",
        width: 800,
        justifyContent: "space-between",
      }}
    >
      {isEditing ? (
        <Input
          value={updatedTitle}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          style={{ marginRight: "8px" }}
        />
      ) : (
        <p>{title}</p>
      )}
      <div>
        {isEditing ? (
          <Button
            type="primary"
            onClick={handleUpdate}
            style={{ marginRight: "8px" }}
          >
            Update
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={handleEdit}
            style={{ marginRight: "8px" }}
          >
            Edit
          </Button>
        )}
        <Button type="danger" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ToDoItem;
