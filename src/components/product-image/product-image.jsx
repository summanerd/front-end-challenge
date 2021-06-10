import React from 'react';
import PropTypes from 'prop-types';

export function ProductImage({ src, description, detailId }) {
  return <img src={src} aria-label={description} alt={description} aria-details={detailId} />;
}

ProductImage.propTypes = {
  src: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  detailId: PropTypes.string.isRequired,
};
