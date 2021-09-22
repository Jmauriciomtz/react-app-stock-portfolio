import React from 'react';


class AddStockForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        shares_owned: 0,
        cost_per_share: 0,
        market_price: 0,
      }
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      const { name, value } = event.target;
      this.setState({ [name]: value }); // [] used since not technically calling name, can be any other attribute
    }
  
    handleSubmit(event) {
      event.preventDefault();
      const { name, shares_owned, cost_per_share, market_price } = this.state;
  
      // onSubmit is passed down as a prop from Portfolio component
      this.props.onSubmit({ // this method will be sent back to Portfolio component w/ complete info
        name,
        shares_owned,
        cost_per_share,
        market_price
      });
  
      this.setState({ // clears property fields for next stock
        name: '',
        shares_owned: 0,
        cost_per_share: 0,
        market_price: 0,
      })
    }
  
    render() {
      const {name, shares_owned, cost_per_share, market_price} = this.state;
      return (
        <form className="col-12 mt-2 mb-4" onSubmit={this.handleSubmit}>
          <input
            className="mx-2"
            name="name"
            type="text"
            placeholder="Name"
            onChange={this.handleChange}
            value={name}
            required
          />
          <input
            className="mx-2"
            name="shares_owned"
            type="number"
            placeholder="Shares"
            value={shares_owned}
            onChange={this.handleChange}
          />
          <input
            className="mx-2"
            name="cost_per_share"
            type="number"
            placeholder="Cost"
            value={cost_per_share}
            onChange={this.handleChange}
          />
          <input
            className="mx-2"
            name="market_price"
            type="number"
            placeholder="Price"
            value={market_price}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary btn-sm">add</button>
        </form>
      )
    }
  }

  export default AddStockForm;