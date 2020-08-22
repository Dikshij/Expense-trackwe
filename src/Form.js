import React from "react";
import Details from "./Details";

class Form extends React.Component {
  state = {
    id: 0,
    balance: 0,
    value: "",
    amount: 0,
    expenseArray: [],
    type: "",
    isEditing: false,
    editId: "",
    previousAmount: ""
  };

  changeValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  saveBalance = (event) => {
    event.preventDefault();
    this.setState({
      balance: this.state.balance
    });
  };

  saveExpense = (event) => {
    event.preventDefault();
    if (this.state.type === "credit") {
      this.setState({
        id: this.state.id + 1,
        balance: parseFloat(this.state.balance) + parseFloat(this.state.amount),
        expenseArray: [
          ...this.state.expenseArray,
          {
            id: this.state.id + 1,
            value: this.state.value,
            amount: this.state.amount,
            type: this.state.type
            // balance:
            //   parseFloat(this.state.balance) + parseFloat(this.state.amount)
          }
        ],

        value: "",
        amount: "",
        type: "",
        isEditing: false,
        editId: ""
      });
    } else {
      this.setState({
        id: this.state.id + 1,
        balance: parseFloat(this.state.balance) - parseFloat(this.state.amount),
        expenseArray: [
          ...this.state.expenseArray,
          {
            id: this.state.id + 1,
            value: this.state.value,
            amount: this.state.amount,
            type: this.state.type
            // balance:
            //   parseFloat(this.state.balance) - parseFloat(this.state.amount)
          }
        ],
        value: "",
        amount: "",
        type: ""
      });
    }
  };

  deleteExpense = (id) => {
    const expense = this.state.expenseArray.find(
      (expense) => expense.id === id
    );
    if (expense.type === "credit") {
      var exp = expense.amount;
      const expenseArrayTemp = this.state.expenseArray.filter(
        (expense) => expense.id !== id
      );
      this.setState({
        expenseArray: expenseArrayTemp,
        balance: parseFloat(this.state.balance) - parseFloat(exp)
      });
    } else {
      var expi = expense.amount;
      const expenseArrayTemp = this.state.expenseArray.filter(
        (expense) => expense.id !== id
      );
      this.setState({
        expenseArray: expenseArrayTemp,
        balance: parseFloat(this.state.balance) + parseFloat(expi)
      });
    }
  };

  setUpEditExpense = (id) => {
    console.log(id);
    const expense = this.state.expenseArray.find(
      (expense) => expense.id === id
    );

    this.setState({
      isEditing: true,
      value: expense.value,
      previousAmount: expense.amount,
      amount: expense.amount,
      type: expense.type,
      editId: id
    });
  };

  editExpense = (event) => {
    event.preventDefault();
    const tempArray = this.state.expenseArray;
    const index = this.state.expenseArray.findIndex(
      (expense) => expense.id === this.state.editId
    );

    tempArray[index] = {
      ...tempArray[index],
      value: this.state.value,
      amount: this.state.amount,
      type: this.state.type
    };
    if (this.state.type === "credit") {
      this.setState({
        taskArray: tempArray,
        isEditing: false,
        balance:
          parseFloat(this.state.balance) -
          parseFloat(this.state.previousAmount) +
          parseFloat(this.state.amount),
        value: "",
        amount: "",
        type: "",
        editId: ""
      });
    }
    if (this.state.type === "debit") {
      this.setState({
        taskArray: tempArray,
        isEditing: false,
        balance:
          parseFloat(this.state.balance) +
          parseFloat(this.state.previousAmount) -
          parseFloat(this.state.amount),
        value: "",
        amount: "",
        type: "",
        editId: ""
      });
    }
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Expense Calculator</h1>
        <form onSubmit={this.saveBalance}>
          <input
            type="number"
            min="0"
            placeholder="enter your bank balace"
            required
            name="balance"
            onChange={this.changeValue}
          ></input>
          <button type="submit">Click me</button>
        </form>
        <form
          onSubmit={this.state.isEditing ? this.editExpense : this.saveExpense}
        >
          <input
            type="number"
            min="0"
            placeholder="enter amount"
            required
            name="amount"
            value={this.state.amount}
            onChange={this.changeValue}
          ></input>
          <br />
          <label>
            Select the option
            <select
              value={this.state.value}
              onChange={this.changeValue}
              name="value"
            >
              <option value="movie">Movie</option>
              <option value="food">Food</option>
              <option value="insurance">Insurance</option>
              <option value="travel">Travel</option>
              <option value="rent">Rent</option>
              <option value="others">Others</option>
            </select>
          </label>
          {this.state.isEditing ? null : (
            <div>
              {" "}
              <label>
                <input
                  type="radio"
                  value="credit"
                  name="type"
                  onChange={this.changeValue}
                  //checked={this.state.name === "credit"}
                />
                Credit
              </label>
              <label>
                <input
                  type="radio"
                  value="debit"
                  name="type"
                  onChange={this.changeValue}
                  //checked={this.state.name === "debit"}
                />
                Debit
              </label>
            </div>
          )}
          {/* <label>
            <input
              type="radio"
              value="credit"
              name="type"
              onChange={this.changeValue}
              //checked={this.state.name === "credit"}
            />
            Credit
          </label>
          <label>
            <input
              type="radio"
              value="debit"
              name="type"
              onChange={this.changeValue}
              //checked={this.state.name === "debit"}
            />
            Debit
          </label> */}

          <button type="submit">Click me</button>
        </form>
        <Details
          expenseArray={this.state.expenseArray}
          balance={this.state.balance}
          deleteExpense={this.deleteExpense}
          editExpense={this.setUpEditExpense}
        ></Details>
      </div>
    );
  }
}

export default Form;
