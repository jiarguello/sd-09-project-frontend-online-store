import React from 'react';
import Categories from './Categories';
import SearchProduct from './SearchProduct';
import ProductCard from './ProductCard';
import * as api from '../services/api';
import '../css/productList.css';

class ProductList extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.searchProduct = this.searchProduct.bind(this);

    this.state = {
      categories: [],
      products: [],
      query: '',
      categoryId: '',
      hasFetched: false,
    };
  }

  async componentDidMount() {
    await api.getCategories()
      .then((response) => this.setState({ categories: response }));
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  async searchProduct() {
    const { categoryId, query } = this.state;
    const products = await api.getProductsFromCategoryAndQuery(categoryId, query);
    this.setState({ products, hasFetched: true });
  }

  render() {
    const { categories, products, hasFetched } = this.state;
    const message = 'Digite algum termo de pesquisa ou escolha uma categoria.';

    return (
      <main className="page-container">
        <section className="categories-container">
          <h4>Categorias:</h4>
          {categories.map(({ id, name }) => (
            <Categories
              key={ id }
              categoryId={ id }
              name={ name }
              handleRadio={ this.handleChange }
            />
          ))}
        </section>
        <section className="productlist-container">
          <SearchProduct
            handleChange={ this.handleChange }
            searchProduct={ this.searchProduct }
          />

          {hasFetched
            ? <ProductCard product={ products.results } />
            : <p data-testid="home-initial-message">{message}</p>}
        </section>
      </main>
    );
  }
}

export default ProductList;
