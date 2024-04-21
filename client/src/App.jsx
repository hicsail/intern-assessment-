import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const statusCode = {
  0: "TODO",
  1: "Pending",
  2: "Completed",
};

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getAllTasks = async () => {
      const res = await axios.get("http://localhost:3000/tasks");
      console.log(res);
      setTasks(res.data);
    };

    getAllTasks();
  }, []);

  return (
    <>
      <div>Todo List</div>
      <ul>
        {tasks &&
          tasks.map((task) => {
            return (
              <li>
                {task.title} - {statusCode[task.status]}
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default App;
