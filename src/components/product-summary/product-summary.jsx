import React from 'react';
import PropTypes from 'prop-types';
import { ProductImage } from '../product-image/product-image';

export function ProductSummary({
  src, description, title, caption,
}) {
  return (
    <div className="product-summary">
      <ProductImage src={src} description={description} />
      <div className="product-summary__title">
        <a href="/">{title}</a>
      </div>
      <div className="product-summary__caption">{caption}</div>
    </div>
  );
}

ProductSummary.propTypes = {
  src: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
