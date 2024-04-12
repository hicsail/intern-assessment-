import { Layout, Row, Col, Typography, Input } from "antd";
const { Header, Footer, Content } = Layout;
import "../styles/toDoList.css";
import { PlusCircleFilled } from "@ant-design/icons";
import { useState } from "react";

const ToDoList = () => {
  const [task, setTask] = useState("");
  const PORT = import.meta.env.VITE_PORT || 5005; // fix later

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
      }
    } catch (error) {
      console.error(error);
    }
  };
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
