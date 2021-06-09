import React from 'react';
import PropTypes from 'prop-types';

export function ProductImage({ src, description }) {
  return <img src={src} aria-label={description} />;
}

ProductImage.propTypes = {
  src: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
