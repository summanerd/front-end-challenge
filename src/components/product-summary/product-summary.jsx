import React from 'react';
import PropTypes from 'prop-types';
import { ProductImage } from '../product-image/product-image';

export function ProductSummary({
  src, description, title, caption, modifier, uniqueId,
}) {
  const id = `product-${uniqueId}`;
  return (
    <div className="product-summary">
      <div className={`product-summary__image product-summary__image-${modifier} mb-3`}>
        <ProductImage src={src} description={description} detailId={id} />
      </div>
      <div className="product-summary__title mb-3">
        <a id={id} href="/">{title}</a>
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
  uniqueId: PropTypes.string.isRequired,
  modifier: PropTypes.oneOf(['vertical', 'horizontal']).isRequired,
};
