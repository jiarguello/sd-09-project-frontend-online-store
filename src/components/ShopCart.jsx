import React, { Component } from 'react';

class ShopCart extends Component {
  render() {
    return (
      <p data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </p>
    );
  }
}

export default ShopCart;
