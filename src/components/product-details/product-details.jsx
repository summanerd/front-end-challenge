import React from 'react';
import PropTypes from 'prop-types';
import { ToggleControl } from '../toggle-control/toggle-control';
import { IncDecControl } from '../inc-dec-control/inc-dec-control';

export class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = this.store.getState();
    this.onQuantityUpdate = this.onQuantityUpdate.bind(this);
    this.onColorUpdate = this.onColorUpdate.bind(this);
    this.onAddToCart = this.onAddToCart.bind(this);
  }

  onColorUpdate(newColor) {
    this.store.updateColor(newColor);
    this.updateState();
  }

  onAddToCart() {
    this.store.onAddToCart();
  }

  onQuantityUpdate(adjustment) {
    const { quantity } = this.state;

    this.store.updateQuantity(quantity + adjustment);
    this.updateState();
  }

  updateState() {
    this.setState(this.store.getState());
  }

  render() {
    const {
      size, color, quantity, formattedPrice, canAddToCart,
    } = this.state;
    const { store: { colorOptions } } = this.props;
    return (
      <div className="product-details">
        <div data-prop="price">
          Price:
          $
          {formattedPrice}
        </div>
        <div data-prop="color">
          <ToggleControl onSelect={this.onColorUpdate} label="color" value={color} options={colorOptions} />
        </div>
        <div data-prop="quantity">
          <IncDecControl onAdjust={this.onQuantityUpdate} label="quantity" quantity={quantity} max={5} />
        </div>
        <div data-prop="size">
          Size:
          {size || '--'}
        </div>
        <div>
          <button disabled={!canAddToCart} data-action="add-to-cart" type="submit" onClick={this.onAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
};
