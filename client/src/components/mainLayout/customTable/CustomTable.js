import Table from "react-bootstrap/Table";

export const CustomTable = ({ transaction }) => {
  const totalExpense = transaction.reduce(
    (acc, { type, amount }) =>
      type === "income" ? acc + +amount : acc - +amount,
    0
  );
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>S.N</th>
          <th>Name</th>
          <th>Income</th>
          <th>Expense</th>
        </tr>
      </thead>
      <tbody>
        {transaction.map((item, index) => (
          <tr key={index}>
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
  );
};
