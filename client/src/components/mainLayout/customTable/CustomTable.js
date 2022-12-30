import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { deleteTransaction } from "../../../helpers/axiosHelper";

export const CustomTable = ({ transaction, fetchingTransaction }) => {
  const [checkState, setCheckState] = useState(false);
  const [itemToDelete, setItemToDelete] = useState([]);

  const [bg, setBg] = useState("success");

  useEffect(() => {
    checkTotalExpense();
  }, []);

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;
    console.log(checked, value);
    if (checked) {
      setItemToDelete([...itemToDelete, value]);
    } else {
      setItemToDelete(itemToDelete.filter((_id) => _id !== value));
      setCheckState(false);
    }

    // filter condition return the result when the given condition matches
    // in this filter function the return data is the data which doesnot statisfy the result
  };
  //   console.log(itemToDelete);

  const handleOnAllSelect = (e) => {
    const checked = e.target.checked;

    if (checked) {
      setItemToDelete(transaction.map(({ _id }) => _id));
      setCheckState(true);
    } else {
      setItemToDelete([]);
      setCheckState(false);
    }
  };

  const totalExpense = transaction.reduce(
    (acc, { type, amount }) =>
      type === "income" ? acc + +amount : acc - +amount,
    0
  );

  const checkTotalExpense = (totalExpense) => {
    if (Math.sign(totalExpense) === 1) {
      //   console.log("positive");
      setBg("success");
    } else {
      //   console.log("negative");
      setBg("danger");
    }
  };

  const hadleOnDelete = async () => {
    if (window.confirm(`Are you sure you want to delete`)) {
      const { status, message } = await deleteTransaction(itemToDelete);
      toast[status](message);
      if (status === "success") {
        fetchingTransaction();
        setItemToDelete([]);
        checkTotalExpense();
      }
    }
    // if (
    //   window.confirm(
    //     `Are you sure you want to delete ${itemToDelete.length} transaction`
    //   )
    // ) {
    //
    // }
  };
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              {" "}
              <Form.Check
                type="checkbox"
                onChange={handleOnAllSelect}
                checked={checkState}
                // checked={transaction.length === itemToDelete.length}
              />
            </th>
            <th>S.N</th>
            <th>Name</th>
            <th>Income</th>
            <th>Expense</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((item, index) => (
            <tr key={index}>
              <td>
                {" "}
                <Form.Check
                  type="checkbox"
                  onChange={handleOnSelect}
                  value={item._id}
                  //   makes the checked state true
                  //   checked={checkState}
                  checked={itemToDelete.includes(item._id)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              {item.type === "income" ? (
                <>
                  {" "}
                  <td className="text-success">${item.amount}</td>
                  <td></td>
                </>
              ) : (
                <>
                  {" "}
                  <td></td> <td className="text-danger">${item.amount}</td>{" "}
                </>
              )}
            </tr>
          ))}
          <tr>
            <td colSpan={3}>Total Balance</td>
            {}
            <td className="text-center" colSpan={2}>
              ${totalExpense}
            </td>
          </tr>
        </tbody>
      </Table>

      {itemToDelete.length ? (
        <div className="d-grid">
          <Button onClick={hadleOnDelete} variant="danger" className="d-grid">
            Delete {itemToDelete.length} transaction(s)
          </Button>
        </div>
      ) : null}
    </>
  );
};
