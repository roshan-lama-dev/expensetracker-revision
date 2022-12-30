import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { deleteTransaction } from "../../../helpers/axiosHelper";

export const CustomTable = ({ transaction }) => {
  const [itemToDelete, setItemToDelete] = useState([]);

  const handleOnSelect = (e) => {
    const { checked, value } = e.target;
    // console.log(checked, value);

    checked
      ? setItemToDelete([...itemToDelete, value])
      : setItemToDelete(itemToDelete.filter((_id) => _id !== value));
    // filter condition return the result when the given condition matches
    // in this filter function the return data is the data which doesnot statisfy the result
  };
  console.log(itemToDelete);

  const handleOnAllSelect = (e) => {
    const checked = e.target.checked;
    checked
      ? setItemToDelete(transaction.map(({ _id }) => _id))
      : setItemToDelete([]);
  };
  const totalExpense = transaction.reduce(
    (acc, { type, amount }) =>
      type === "income" ? acc + +amount : acc - +amount,
    0
  );

  const hadleOnDelete = async () => {
    if (window.confirm(`Are you sure you want to delete`)) {
      const result = await deleteTransaction(itemToDelete);
      console.log(result);
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
                checked={transaction.length === itemToDelete.length}
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
                  // makes the checked state true
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
            <td>${totalExpense}</td>
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
