import React from 'react';


class Stock extends React.Component {
    render() {
      const { handleChange, removeStock, stock, index } = this.props; 
      const { name, shares_owned, cost_per_share, market_price } = stock; 
  
      const market_value = shares_owned * market_price;
      const unrealized_gain_loss = market_value - shares_owned * cost_per_share;
      // Adopting the underscore_style for consistency
  
      return (
        <tr>
          <td>{name}</td>
          <td><input onChange={e => handleChange(e, index)} type="number" name="shares_owned" value={shares_owned} /></td>
          <td><input onChange={e => handleChange(e, index)} type="number" name="cost_per_share" value={cost_per_share} /></td>
          <td><input onChange={e => handleChange(e, index)} type="number" name="market_price" value={market_price} /></td>
          <td>{market_value}</td>
          <td>{unrealized_gain_loss}</td>
          <td><button className="btn btn-light btn-sm" onClick={() => removeStock(index)}>remove</button></td>
        </tr>
      )
    }
}

export default Stock;