import React from 'react';
import PropTypes from 'prop-types';
import { ToggleControl } from '../toggle-control/toggle-control';
import { IncDecControl } from '../inc-dec-control/inc-dec-control';
import { SingleSelect } from '../select/single-select';

export class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = this.store.getState();
    this.onQuantityUpdate = this.onQuantityUpdate.bind(this);
    this.onColorUpdate = this.onColorUpdate.bind(this);
    this.onAddToCart = this.onAddToCart.bind(this);
    this.onSizeUpdate = this.onSizeUpdate.bind(this);
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

  onSizeUpdate(newSize) {
    this.store.updateSize(newSize);
    this.updateState();
  }

  updateState() {
    this.setState(this.store.getState());
  }

  render() {
    const {
      size, color, quantity, formattedPrice, canAddToCart,
    } = this.state;
    const { store: { colorOptions, sizeOptions, translations } } = this.props;
    return (
      <div className="product-details">
        <div className="mb-3" data-prop="price">
          <h1>
            $
            {formattedPrice}
          </h1>
        </div>
        <div className="mb-3" data-prop="color">
          <ToggleControl
            onSelect={this.onColorUpdate}
            label={translations.color}
            value={color}
            options={colorOptions}
          />
        </div>
        <div className="mb-3" data-prop="quantity">
          <IncDecControl
            onAdjust={this.onQuantityUpdate}
            label={translations.quantity}
            quantity={quantity}
            max={5}
          />
        </div>
        <div className="mb-3 product-control" data-prop="size">
          <SingleSelect
            defaultLabel={translations.size}
            onChange={([newSize]) => this.onSizeUpdate(newSize)}
            options={sizeOptions}
            selectedValues={size ? [size] : []}
          />
        </div>
        <div className="mb-5">
          <a href="/"><h5>{translations.whatsMySize}</h5></a>
        </div>
        <div className="mb-5 product-control">
          <button className="block" disabled={!canAddToCart} data-action="add-to-cart" type="submit" onClick={this.onAddToCart}>
            {translations.addToCart}
          </button>
        </div>
        <div className="text-center">
          <a href="/"><h2>{translations.promotion}</h2></a>
        </div>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
};
