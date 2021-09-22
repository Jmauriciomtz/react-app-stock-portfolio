import React from 'react';
import AddStockForm from './AddStockForm';
import Stock from './Stock';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: [
        {
          name: 'Facebook',
          shares_owned: 20,
          cost_per_share: 50,
          market_price: 130
        },{
          name: 'Amazon',
          shares_owned: 5,
          cost_per_share: 200,
          market_price: 500
        },{
          name: 'Instagram',
          shares_owned: 100,
          cost_per_share: 20,
          market_price: 3
        }
      ],
      form: {
        name: '',
        shares_owned: 0,
        cost_per_share: 0,
        market_price: 0
      }
    };

    this.removeStock = this.removeStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.addStock = this.addStock.bind(this);
  }

  removeStock(index) {
    const portfolio = this.state.portfolio.slice(); // creates portfolio duplicate. Shallow copy
    portfolio.splice(index, 1); // removes one element at given index

    this.setState({ portfolio }); // updates state w/ duplicate porfolio
  }

  handleChange(event, index) {
    const portfolio = this.state.portfolio.slice();
    const { name, value } = event.target;

    console.log(portfolio[index][name]); // returns val before change
    console.log(value); // returns current value

    portfolio[index][name] = value;
    this.setState({ portfolio });
  }

  handleFormChange(event) {
    const { name, value } = event.target;
    const { form } = this.state;

    form[name] = value;
    this.setState({ form });
  }

  addStock(stock) {
    const portfolio = this.state.portfolio.slice();

    portfolio.push(stock); // adds new stock into portfolio

    this.setState({ portfolio });
  }

  render() {
    const { portfolio, form } = this.state; 

    const portfolio_market_value = portfolio.reduce((sum, stock) => stock.shares_owned * stock.market_price + sum, 0);
    const portfolio_cost = portfolio.reduce((sum, stock) => stock.shares_owned * stock.cost_per_share + sum, 0);
    const portfolio_gain_loss = portfolio_market_value - portfolio_cost;

    return (
      <div className="container">
        <h1 className="text-center my-4">Stock Portfolio</h1>
        <div className="row">
          <div className="col-12">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Shares Owned</th>
                  <th scope="col">Cost per Share ($)</th>
                  <th scope="col">Market Price ($)</th>
                  <th scope="col">Market Value ($)</th>
                  <th scope="col">Unrealized Gain/Loss ($)</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((stock, index) => (
                  <Stock key={index} index={index} stock={stock} handleChange={this.handleChange} removeStock={this.removeStock} />
                ))}
              </tbody>
            </table>
          </div>

          <AddStockForm onSubmit={this.addStock} />

          <div className="col-12 col-md-6">
            <h4 className="mb-3">Portfolio value: $ {portfolio_market_value}</h4>
          </div>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">Portfolio gain/loss: $ {portfolio_gain_loss}</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;