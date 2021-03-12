import React from 'react';
import CreateCard from './CreateCartCard';

class RenderToCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cont:'',
      title:'',
      thumbnail:'',
      price:'',
    }
  }

  getLocalStorage = () => {
    const storageArray = Object.values(localStorage);
    const item = storageArray.map((item) => item.split('||'));
    return item; 
  }

  render() {
    const cartItensArray = this.getLocalStorage();
    return(
      <div>
        {cartItensArray.map((array) => {
          const productItem = {
            quant: Number(array[0]),
            title: array[1],
            thumbnail: array[2],
            price: Number(array[3])
          };
          return (
          <div className="card" key={ productItem.thumbnail }>
            <CreateCard product={ productItem } />
          </div>)
        })}
      </div>
    );
  }
}
export default RenderToCart;