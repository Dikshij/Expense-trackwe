import React from "react";

class Form extends React.Component {
  state = {
    balance: 0,
    value: "",
    amount: 0
  };

  changeValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  saveBalance = (event) => {
    event.preventDefault();
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
        <form>
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
          <button type="submit">Click me</button>
        </form>
      </div>
    );
  }
}

export default Form;
