import { Layout, Row, Col, Typography } from "antd";
const { Header, Footer, Content } = Layout;
import "../styles/toDoList.css";

const ToDoList = () => {
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
            <div className="div-to-do">
              {" "}
              <Typography.Title level={2} className="section-header">
                To Do
              </Typography.Title>
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
