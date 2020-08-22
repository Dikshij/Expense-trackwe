import React from "react";
import Details from "./Details";

class Form extends React.Component {
  state = {
    id: 0,
    balance: 0,
    value: "",
    amount: 0,
    expenseArray: [],
    type: ""
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
    if (this.state.type === "credit")
      this.setState({
        id: this.state.id + 1,
        expenseArray: [
          ...this.state.expenseArray,
          {
            id: this.state.id + 1,
            value: this.state.value,
            amount: this.state.amount,
            type: this.state.type,
            balance:
              parseFloat(this.state.balance) + parseFloat(this.state.amount)
          }
        ],
        value: "",
        amount: "",
        type: ""
      });
    else
      this.setState({
        id: this.state.id + 1,
        expenseArray: [
          ...this.state.expenseArray,
          {
            id: this.state.id + 1,
            value: this.state.value,
            amount: this.state.amount,
            type: this.state.type,
            balance:
              parseFloat(this.state.balance) - parseFloat(this.state.amount)
          }
        ],
        value: "",
        amount: "",
        type: ""
      });
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
        <form onSubmit={this.saveExpense}>
          <input
            type="number"
            min="0"
            placeholder="enter amount"
            required
            name="amount"
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
          <button type="submit">Click me</button>
        </form>
        <Details expenseArray={this.state.expenseArray}></Details>
      </div>
    );
  }
}

export default Form;
