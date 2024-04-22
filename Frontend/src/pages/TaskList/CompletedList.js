import React, { useEffect, useState } from 'react'
import Task from '../../components/task/Task.js';
import { deleteTask, getCompletedTask } from '../../services.js';

function CompletedList() {
  const [tasks, setTasks] = useState([
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allTasks = await getCompletedTask();
        setTasks(allTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, []);
  const handleDeleteTask = async (taskId) => {
    const deletedTask = await deleteTask(taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  const completeTask = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: true };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  return (
    <>
        {tasks.map(task => (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          onDelete={handleDeleteTask}
          onComplete={completeTask}
        />
      ))}
    </>
  );
}

export default CompletedList;