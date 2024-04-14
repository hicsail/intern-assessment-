import { Layout, Row, Col, Typography, Input } from "antd";
const { Header, Footer, Content } = Layout;
// import "../styles/toDoList.css";
import { PlusCircleFilled } from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const PORT = import.meta.env.VITE_PORT || 5005; // fix later

  // update task
  const updateTask = async (task, newTitle) => {
    console.log("updating task", task);
    try {
      const response = await fetch(
        `http://localhost:${PORT}/tasks/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTitle),
        }
      );
      if (response.ok) {
        console.log("Task updated successfully");
        fetchTasks(); //refresh
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // delete a task by id
  const deleteTask = async (task) => {
    console.log("deleting task", task.id);
    try {
      const response = await fetch(
        `http://localhost:${PORT}/tasks/${task.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Task deleted successfully");
        fetchTasks(); // refresh
      } else {
        console.error("Failed to delete task");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // creates new task from input form
  const createNewTask = async (task) => {
    console.log("creating new task...", task);
    try {
      const response = await fetch(`http://localhost:${PORT}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: task }),
      });
      setTask("");
      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        fetchTasks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  //gets all tasks from backend
  const getAllTasks = async () => {
    // console.log("getting all tasks...");
    try {
      const response = await fetch(`http://localhost:${PORT}/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data.message, data.tasks);
        return data.tasks;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTasks = async () => {
    const tasks = await getAllTasks();
    // console.log("RESPONSE:", tasks);
    setTaskList(tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Layout>
      <Header className="header">Task Tackler</Header>
      <Content>
        <Row
          style={{
            justifyContent: "center",
            height: "70vh",
            margin: "20px 50px",
          }}
        >
          <Col
            style={{
              backgroundColor: "aliceblue",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
            span={18}
          >
            <Typography.Title level={2} className="section-header">
              To Do
            </Typography.Title>
            <div className="div-to-do" style={{ display: "flex" }}>
              {" "}
              <Input
                placeholder="Take out the trash..."
                variant="filled"
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
              <PlusCircleFilled onClick={() => createNewTask(task)} />
            </div>
            {taskList
              ? taskList.map((task) => (
                  <ToDoItem
                    key={task.id}
                    title={task.title}
                    onDelete={() => deleteTask(task)}
                    onUpdate={(newTitle) => updateTask(task, newTitle)}
                  />
                ))
              : ""}
          </Col>
        </Row>
        <Footer style={{ textAlign: "center" }}>
          SAIL Intern Assessment ©{new Date().getFullYear()} Created by Owen
          Mariani
        </Footer>
      </Content>
    </Layout>
  );
};

export default ToDoList;
