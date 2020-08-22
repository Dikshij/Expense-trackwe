import React from "react";

class Details extends React.Component {
  render() {
    return (
      <div>
        <h1>Let's Track the expenses</h1>
        <table>
          <thead>
            <th>id</th>
            <th>Amount</th>
            <th>Name</th>
            <th>Balance</th>
          </thead>
          <tbody>
            {this.props.expenseArray.map((expense) => {
              return (
                <tr key={expense.id}>
                  <td>{expense.id}</td>
                  <td>{expense.amount}</td>
                  <td>{expense.value}</td>
                  <td>{expense.Balance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Details;
