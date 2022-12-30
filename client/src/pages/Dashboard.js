import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { CustomForm } from "../components/mainLayout/customForm/CustomForm";
import { CustomTable } from "../components/mainLayout/customTable/CustomTable";
import { MainLayout } from "../components/mainLayout/MainLayout";
import { fetchTransaction } from "../helpers/axiosHelper";

const Dashboard = () => {
  const [loginUser, setLoginUser] = useState({});
  const [transaction, setTransaction] = useState([]);
  useEffect(() => {
    fetchingTransaction();
    const str = sessionStorage.getItem("user");

    if (str) {
      setLoginUser(JSON.parse(str));
    }
  }, []);

  const fetchingTransaction = async () => {
    const { status, result } = await fetchTransaction();
    console.log(result);
    status === "success" && setTransaction(result);
  };

  return (
    <MainLayout>
      <Container className="mt-5 ">
        <div className="welcome pl-4 text-bold">Welcome {loginUser.name}</div>
        {/* formsection */}
        {/* table section */}
        <div className="form m-3">
          <CustomForm />
        </div>
        <div className="table">
          <p> {transaction.length} Transaction found</p>
          <CustomTable transaction={transaction} />
        </div>
      </Container>
    </MainLayout>
  );
};

export default Dashboard;
