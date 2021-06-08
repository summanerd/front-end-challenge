import React from 'react';

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
        formattedPrice: price.toFixed(2),
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
      size, color, quantity, formattedPrice,
    } = this.state;
    const { onAddToCart } = this.store;
    return (
      <main>
        <div data-prop="price">
          Price:
          $
          {formattedPrice}
        </div>
        <div data-prop="color">
          Color:
          {color}
        </div>
        <div data-prop="quantity">
          Quantity:
          {quantity}
        </div>
        <div data-prop="size">
          Size:
          {size || '--'}
        </div>
        <div><button data-action="add-to-cart" type="submit" onClick={onAddToCart}>Add to Cart</button></div>
      </main>
    );
  }
}

export { App };
