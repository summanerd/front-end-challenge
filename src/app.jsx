import React from 'react';
import ReactDOM from 'react-dom';

function getStore() {
  let color = 'black';
  let size;
  let quantity = 0;
  const price = 35;

  return {
    get price() {
      return price;
    },
    get size() {
      return size;
    },
    get color() {
      return color;
    },
    get quantity() {
      return quantity;
    },
    onAddToCart() {
      console.log(`adding ${quantity} product(s) size: ${size}, color: ${color} at ${price} each`);
    },
    updateQuantity(newQuantity) {
      quantity = newQuantity;
    },
    updateSize(newSize) {
      size = newSize;
    },
    updateColor(newColor) {
      color = newColor;
    },
    getState() {
      return {
        size,
        color,
        quantity,
        price,
      };
    },
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.store = getStore();
    this.state = this.store.getState();
  }

  updateState() {
    this.setState(this.store.getState());
  }

  render() {
    const {
      size, color, quantity, price,
    } = this.state;
    const { onAddToCart } = this.store;
    return (
      <main>
        <div>
          Price:
          {price}
        </div>
        <div>
          Color:
          {color}
        </div>
        <div>
          Quantity:
          {quantity}
        </div>
        <div>
          Size:
          {size || '--'}
        </div>
        <div><button type="submit" onClick={onAddToCart}>Add to Cart</button></div>
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
module.hot.accept();
