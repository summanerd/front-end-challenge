import React from 'react';
import PropTypes from 'prop-types';
import { ProductImage } from '../product-image/product-image';

export function ProductSlides({ images, productDescription }) {
  return (
    <div className="product-slides" aria-label={productDescription}>
      {
        images.map(({ src, description }) => (
          <div className="product-slide" key={`product-${src}`}>
            <ProductImage src={src} description={description} />
          </div>
        ))
      }
    </div>
  );
}

ProductSlides.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  productDescription: PropTypes.string.isRequired,
};
