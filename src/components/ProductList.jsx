import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from './Categories';
import ProductCard from './ProductCard';
import * as api from '../services/api';
import './styles/ProductList.css';

class ProductList extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.emptySearch = this.emptySearch.bind(this);
    this.productMap = this.productMap.bind(this);
    this.state = {
      productId: '',
      productQuery: '',
    };
  }

  async handleClick(id) {
    await this.setState({
      productId: id,
    });
    this.buttonClick();
  }

  handleChange({ target }) {
    this.setState({
      productQuery: target.value,
    });
  }

  async buttonClick() {
    const { productId, productQuery } = this.state;
    const promise = await api.getProductsFromCategoryAndQuery(productId, productQuery);
    this.setState({
      results: promise.results,
    });
  }

  emptySearch() {
    return (
      <div className="empty-search">
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
      </div>
    );
  }

  productMap() {
    const { results } = this.state;
    return (
      <div>
        {
          results
            .map(({ title, thumbnail, price, id, available_quantity: availableQnt }) => (
              <ProductCard
                title={ title }
                image={ thumbnail }
                key={ id }
                productId={ id }
                price={ price }
                availableQnt={ availableQnt }
              />))
        }
      </div>
    );
  }

  render() {
    const { results } = this.state;
    return (
      <div>
        <header className="header">
          <div className="search-bar">
            <label htmlFor="search-input">
              <input
                data-testid="query-input"
                type="text"
                name="search-input"
                placeholder="Buscar"
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="query-button"
              type="button"
              onClick={ this.buttonClick }
            >
              Buscar
            </button>
          </div>
          <div className="link">
            <Link to="/shopping-cart" data-testid="shopping-cart-button">Carrinho</Link>
          </div>
        </header>
        <div className="main-container">
          <div className="categories">
            <Categories handleClick={ this.handleClick } />
          </div>
          <div className="results">
            { !results ? this.emptySearch() : this.productMap() }
          </div>
        </div>
      </div>
    );
  }
}

export default ProductList;
