import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { MainLayout } from "../components/mainLayout/MainLayout";

const Dashboard = () => {
  const [loginUser, setLoginUser] = useState({});

  useEffect(() => {
    const str = sessionStorage.getItem("user");

    if (str) {
      setLoginUser(JSON.parse(str));
    }
  }, []);

  return (
    <MainLayout>
      <Container className="mt-5 bg-info p-5">
        Welcome {loginUser.name}
      </Container>
    </MainLayout>
  );
};

export default Dashboard;
