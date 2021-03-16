import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

class Cart extends React.Component {
  render() {
    const { cartList } = this.props;

    return (
      <section className="cart-container">
        <Link to="/">Voltar</Link>
        { cartList.length > 0
          ? cartList.map((currentItem) => (
            <CartItem key={ currentItem.id } item={ currentItem } />
          ))
          : (
            <div>
              <button data-testid="shopping-cart-button" type="button">voltar</button>
              <span data-testid="shopping-cart-product-name">Pequeno Principe, O</span>
              <span data-testid="shopping-cart-product-quantity">1</span>
            </div>
          )}

      </section>
    );
  }
}

Cart.propTypes = {
  cartList: PropTypes.arrayOf(Object),
};

Cart.defaultProps = {
  cartList: PropTypes.arrayOf(Object),
};

export default Cart;
